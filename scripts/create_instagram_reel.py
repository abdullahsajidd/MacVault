#!/usr/bin/env python3
"""Render a vertical MacVault Instagram Reel from the site's local brand assets."""

from __future__ import annotations

import math
import os
import shutil
import subprocess
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUTPUT_DIR = ROOT / "artifacts" / "instagram"
FFMPEG = os.environ.get("FFMPEG_BIN") or shutil.which("ffmpeg")

W, H = 720, 1280
FPS = 24
DURATION = 15.0
BLUE = (17, 112, 242)
BLUE_DARK = (7, 82, 196)
INK = (7, 17, 29)
MUTED = (89, 104, 128)
SURFACE = (245, 248, 252)
WHITE = (255, 255, 255)
LINE = (216, 227, 241)

WINDOWS_FONTS = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"
FONT_CANDIDATES = {
    "regular": [
        WINDOWS_FONTS / "arial.ttf",
        Path("/System/Library/Fonts/SFNS.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ],
    "rounded": [
        WINDOWS_FONTS / "arial.ttf",
        Path("/System/Library/Fonts/SFNSRounded.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ],
    "bold": [
        WINDOWS_FONTS / "arialbd.ttf",
        Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ],
}


def font(size: int, bold: bool = False, rounded: bool = False) -> ImageFont.FreeTypeFont:
    style = "bold" if bold else ("rounded" if rounded else "regular")
    path = next((candidate for candidate in FONT_CANDIDATES[style] if candidate.exists()), None)
    if path is None:
        raise FileNotFoundError(f"No supported {style} font was found")
    return ImageFont.truetype(str(path), size=size)


def smoothstep(value: float) -> float:
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)


def centered_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: int,
    text_font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int] = INK,
    spacing: int = 10,
) -> tuple[int, int, int, int]:
    box = draw.multiline_textbbox((0, 0), text, font=text_font, spacing=spacing, align="center")
    width = box[2] - box[0]
    height = box[3] - box[1]
    x = (W - width) // 2
    draw.multiline_text((x, y), text, font=text_font, fill=fill, spacing=spacing, align="center")
    return (x, y, x + width, y + height)


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def cover(path: Path, size: tuple[int, int], focus: tuple[float, float] = (0.5, 0.5)) -> Image.Image:
    image = Image.open(path).convert("RGB")
    target_ratio = size[0] / size[1]
    source_ratio = image.width / image.height
    if source_ratio > target_ratio:
        crop_width = int(image.height * target_ratio)
        left = int((image.width - crop_width) * focus[0])
        left = max(0, min(image.width - crop_width, left))
        image = image.crop((left, 0, left + crop_width, image.height))
    else:
        crop_height = int(image.width / target_ratio)
        top = int((image.height - crop_height) * focus[1])
        top = max(0, min(image.height - crop_height, top))
        image = image.crop((0, top, image.width, top + crop_height))
    return image.resize(size, Image.Resampling.LANCZOS)


def paste_card(
    canvas: Image.Image,
    image: Image.Image,
    box: tuple[int, int, int, int],
    radius: int = 30,
    border: tuple[int, int, int] = WHITE,
) -> None:
    x0, y0, x1, y1 = box
    card_size = (x1 - x0, y1 - y0)
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((x0 + 5, y0 + 13, x1 + 5, y1 + 13), radius=radius, fill=(5, 20, 45, 42))
    shadow = shadow.filter(ImageFilter.GaussianBlur(15))
    canvas.alpha_composite(shadow)

    framed = Image.new("RGBA", card_size, border + (255,))
    inner = image.resize((card_size[0] - 12, card_size[1] - 12), Image.Resampling.LANCZOS).convert("RGBA")
    framed.alpha_composite(inner, (6, 6))
    mask = rounded_mask(card_size, radius)
    canvas.paste(framed, (x0, y0), mask)


def base_light() -> Image.Image:
    canvas = Image.new("RGBA", (W, H), SURFACE + (255,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-160, 40, 490, 690), fill=(30, 137, 255, 45))
    gd.ellipse((390, 760, 920, 1290), fill=(87, 186, 255, 34))
    return Image.alpha_composite(canvas, glow.filter(ImageFilter.GaussianBlur(75)))


def base_dark() -> Image.Image:
    canvas = Image.new("RGBA", (W, H), INK + (255,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-240, -120, 540, 660), fill=(13, 103, 229, 105))
    gd.ellipse((400, 730, 980, 1340), fill=(25, 133, 255, 65))
    return Image.alpha_composite(canvas, glow.filter(ImageFilter.GaussianBlur(95)))


def add_wordmark(canvas: Image.Image, y: int, width: int = 330) -> None:
    draw = ImageDraw.Draw(canvas)
    mark_font = font(max(40, width // 6), bold=True)
    name_font = font(max(34, width // 8), bold=True)
    mark_box = draw.textbbox((0, 0), "MV", font=mark_font)
    name_box = draw.textbbox((0, 0), "MacVault", font=name_font)
    gap = max(14, width // 24)
    total_width = mark_box[2] + gap + name_box[2]
    x = (W - total_width) // 2
    draw.text((x, y), "M", font=mark_font, fill=INK)
    m_width = draw.textlength("M", font=mark_font)
    draw.text((x + m_width - 5, y), "V", font=mark_font, fill=BLUE)
    draw.text((x + mark_box[2] + gap, y + 8), "MacVault", font=name_font, fill=INK)


def add_top_mark(canvas: Image.Image, text: str = "MACVAULT / LAHORE", dark: bool = False) -> None:
    draw = ImageDraw.Draw(canvas)
    fill = (214, 230, 255) if dark else BLUE_DARK
    draw.text((52, 72), text, font=font(18, bold=True), fill=fill)
    draw.ellipse((640, 76, 656, 92), fill=BLUE if not dark else (91, 173, 255))


def chip(draw: ImageDraw.ImageDraw, text: str, xy: tuple[int, int], dark: bool = False) -> None:
    text_font = font(21, bold=True)
    box = draw.textbbox((0, 0), text, font=text_font)
    width = box[2] - box[0] + 46
    height = 56
    x, y = xy
    fill = (20, 39, 65) if dark else WHITE
    outline = (63, 112, 178) if dark else LINE
    text_fill = WHITE if dark else INK
    draw.rounded_rectangle((x, y, x + width, y + height), radius=28, fill=fill, outline=outline, width=2)
    draw.text((x + 23, y + 14), text, font=text_font, fill=text_fill)


def build_scenes() -> list[Image.Image]:
    product_dir = PUBLIC / "images" / "products"
    iphone = cover(product_dir / "iphone-15-pro-max-256-1.jpg", (550, 560), (0.58, 0.35))
    macbook = cover(product_dir / "macbook-pro-m3-pro-14-1.jpg", (300, 535), (0.55, 0.55))
    ps5 = cover(product_dir / "ps5-slim-disc-bundle-1.jpg", (300, 535), (0.48, 0.44))
    airpods = cover(product_dir / "airpods-pro-2-usb-c-1.jpg", (240, 240), (0.5, 0.45))

    scenes: list[Image.Image] = []

    # 1. Brand hook
    s = base_light()
    d = ImageDraw.Draw(s)
    add_wordmark(s, 148, 360)
    centered_text(d, "Your next\nupgrade is here.", 400, font(72, bold=True), INK, 3)
    centered_text(d, "Apple + PlayStation in Lahore", 605, font(28, bold=True), BLUE_DARK)
    paste_card(s, iphone, (85, 740, 635, 1188), 44)
    d.rounded_rectangle((170, 1124, 550, 1192), radius=34, fill=INK)
    d.text((222, 1143), "CURATED. CHECKED. READY.", font=font(18, bold=True), fill=WHITE)
    scenes.append(s)

    # 2. Product categories
    s = base_dark()
    d = ImageDraw.Draw(s)
    add_top_mark(s, dark=True)
    centered_text(d, "Made for the\nupgrade moment.", 150, font(62, bold=True), WHITE, 3)
    paste_card(s, macbook, (48, 430, 348, 965), 36)
    paste_card(s, ps5, (372, 430, 672, 965), 36)
    chip(d, "iPhone", (86, 1015), dark=True)
    chip(d, "MacBook", (252, 1015), dark=True)
    chip(d, "PlayStation", (454, 1015), dark=True)
    d.text((157, 1124), "Plus iPad, Watch and AirPods", font=font(25, bold=True), fill=(213, 229, 250))
    scenes.append(s)

    # 3. Buyer facts
    s = base_light()
    d = ImageDraw.Draw(s)
    add_top_mark(s)
    centered_text(d, "Check what matters.", 175, font(62, bold=True), INK)
    centered_text(d, "Clear details before you decide.", 265, font(27), MUTED)
    panel = (55, 380, 665, 1075)
    d.rounded_rectangle(panel, radius=44, fill=INK)
    checks = [
        ("PTA status", "For every iPhone unit"),
        ("Battery health", "Phone and Watch condition"),
        ("Cycle count", "For every MacBook"),
        ("Warranty", "Terms confirmed in writing"),
    ]
    for index, (label, sub) in enumerate(checks):
        y = 445 + index * 146
        d.ellipse((94, y, 148, y + 54), fill=BLUE)
        d.line((109, y + 28, 121, y + 40, 138, y + 16), fill=WHITE, width=6, joint="curve")
        d.text((176, y - 1), label, font=font(31, bold=True), fill=WHITE)
        d.text((176, y + 49), sub, font=font(20), fill=(177, 197, 224))
        if index < len(checks) - 1:
            d.line((94, y + 101, 626, y + 101), fill=(35, 54, 79), width=2)
    centered_text(d, "No vague product page.", 1135, font(25, bold=True), BLUE_DARK)
    scenes.append(s)

    # 4. Expected price range
    s = base_dark()
    d = ImageDraw.Draw(s)
    add_top_mark(s, dark=True)
    centered_text(d, "A smarter way to\nshow the price.", 170, font(61, bold=True), WHITE, 3)
    d.rounded_rectangle((55, 490, 665, 875), radius=48, fill=WHITE)
    d.text((102, 548), "EXPECTED PRICE", font=font(19, bold=True), fill=BLUE_DARK)
    d.text((102, 625), "Rs 120,000", font=font(55, bold=True), fill=INK)
    d.text((487, 635), "TO", font=font(20, bold=True), fill=MUTED)
    d.text((102, 714), "Rs 130,000", font=font(55, bold=True), fill=INK)
    d.rounded_rectangle((98, 800, 622, 850), radius=25, fill=(230, 240, 255))
    d.text((170, 814), "Final price confirmed today", font=font(21, bold=True), fill=BLUE_DARK)
    centered_text(d, "Transparent range. Current confirmation.", 1000, font(25), (202, 220, 244))
    scenes.append(s)

    # 5. Local buying flow
    s = base_light()
    d = ImageDraw.Draw(s)
    add_top_mark(s)
    paste_card(s, airpods, (430, 175, 670, 415), 120)
    d.text((54, 190), "See it.", font=font(68, bold=True), fill=INK)
    d.text((54, 285), "Check it.", font=font(68, bold=True), fill=INK)
    d.text((54, 380), "Decide.", font=font(68, bold=True), fill=BLUE)
    steps = [
        ("01", "Choose the product"),
        ("02", "Confirm today's price"),
        ("03", "Review unit details"),
        ("04", "Arrange Lahore handover"),
    ]
    for index, (number, label) in enumerate(steps):
        y = 590 + index * 125
        d.rounded_rectangle((55, y, 665, y + 94), radius=28, fill=WHITE, outline=LINE, width=2)
        d.text((84, y + 28), number, font=font(20, bold=True), fill=BLUE)
        d.text((155, y + 24), label, font=font(28, bold=True), fill=INK)
    centered_text(d, "Available products are ready to discuss.", 1120, font(22), MUTED)
    scenes.append(s)

    # 6. Final CTA
    s = Image.new("RGBA", (W, H), BLUE + (255,))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-100, -80, 840, 860), fill=(104, 194, 255, 100))
    s = Image.alpha_composite(s, glow.filter(ImageFilter.GaussianBlur(120)))
    d = ImageDraw.Draw(s)
    d.rounded_rectangle((70, 145, 650, 355), radius=46, fill=WHITE)
    add_wordmark(s, 190, 390)
    centered_text(d, "Ready for your\nnext upgrade?", 465, font(70, bold=True), WHITE, 4)
    centered_text(d, "Confirm today's price", 680, font(32, bold=True), (224, 240, 255))
    d.rounded_rectangle((85, 805, 635, 910), radius=53, fill=WHITE)
    d.text((173, 839), "WHATSAPP MACVAULT", font=font(28, bold=True), fill=BLUE_DARK)
    centered_text(d, "+92 339 4004289", 970, font(34, bold=True), WHITE)
    centered_text(d, "macvault.pk  •  Lahore", 1045, font(26, bold=True), (222, 238, 255))
    centered_text(d, "Apple and PlayStation products", 1140, font(20), (197, 226, 255))
    scenes.append(s)

    return scenes


def animate_scene(scene: Image.Image, progress: float, scene_index: int) -> Image.Image:
    # Gentle push-in gives the static brand layouts a premium motion feel.
    scale = 1.0 + 0.025 * smoothstep(progress)
    width = int(W * scale)
    height = int(H * scale)
    resized = scene.resize((width, height), Image.Resampling.BICUBIC)
    drift = int((progress - 0.5) * 8 * (1 if scene_index % 2 == 0 else -1))
    x = max(0, min(width - W, (width - W) // 2 + drift))
    y = max(0, min(height - H, (height - H) // 2 - drift))
    return resized.crop((x, y, x + W, y + H))


def add_progress(frame: Image.Image, t: float) -> None:
    draw = ImageDraw.Draw(frame)
    draw.rounded_rectangle((48, 34, W - 48, 42), radius=4, fill=(255, 255, 255, 75))
    width = int((W - 96) * max(0.0, min(1.0, t / DURATION)))
    fill = WHITE if t >= 2.2 and t < 4.9 or t >= 7.4 and t < 9.9 or t >= 12.4 else BLUE
    draw.rounded_rectangle((48, 34, 48 + width, 42), radius=4, fill=fill)


def write_audio(path: Path) -> None:
    sample_rate = 44100
    length = int(DURATION * sample_rate)
    t = np.arange(length, dtype=np.float64) / sample_rate
    audio = np.zeros(length, dtype=np.float64)

    # Warm, original electronic bed: soft kick, pulse, and sparse glassy notes.
    for beat in np.arange(0.0, DURATION, 0.5):
        start = int(beat * sample_rate)
        count = min(int(0.22 * sample_rate), length - start)
        local = np.arange(count) / sample_rate
        kick = np.sin(2 * np.pi * (68 - 38 * local) * local) * np.exp(-local * 18)
        audio[start : start + count] += 0.22 * kick

    notes = [220.0, 277.18, 329.63, 440.0]
    for index, start_time in enumerate(np.arange(0.15, DURATION, 1.25)):
        start = int(start_time * sample_rate)
        count = min(int(0.75 * sample_rate), length - start)
        local = np.arange(count) / sample_rate
        frequency = notes[index % len(notes)]
        tone = (
            np.sin(2 * np.pi * frequency * local)
            + 0.45 * np.sin(2 * np.pi * frequency * 2 * local)
        ) * np.exp(-local * 5.8)
        audio[start : start + count] += 0.08 * tone

    pad = 0.025 * np.sin(2 * np.pi * 110 * t) + 0.018 * np.sin(2 * np.pi * 164.81 * t)
    envelope = np.minimum(1.0, t / 0.5) * np.minimum(1.0, (DURATION - t) / 0.8)
    audio += pad * np.clip(envelope, 0, 1)
    audio = np.tanh(audio * 1.4)
    stereo = np.column_stack((audio, np.roll(audio, 80)))
    pcm = np.int16(np.clip(stereo, -1.0, 1.0) * 32767)

    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        wav.writeframes(pcm.tobytes())


def render() -> tuple[Path, Path]:
    if not FFMPEG or not Path(FFMPEG).exists():
        raise FileNotFoundError("ffmpeg was not found. Install it or set FFMPEG_BIN.")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    silent_video = OUTPUT_DIR / "macvault-instagram-reel-silent.mp4"
    audio_path = OUTPUT_DIR / "macvault-reel-audio.wav"
    final_video = OUTPUT_DIR / "macvault-instagram-reel.mp4"
    cover_path = OUTPUT_DIR / "macvault-instagram-reel-cover.jpg"

    scenes = build_scenes()
    durations = [2.2, 2.7, 2.5, 2.5, 2.5, 2.6]
    boundaries = np.cumsum([0.0] + durations)
    transition = 0.34

    command = [
        str(FFMPEG),
        "-y",
        "-f",
        "rawvideo",
        "-vcodec",
        "rawvideo",
        "-pix_fmt",
        "rgb24",
        "-s",
        f"{W}x{H}",
        "-r",
        str(FPS),
        "-i",
        "-",
        "-vf",
        "scale=1080:1920:flags=lanczos,format=yuv420p",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "18",
        "-movflags",
        "+faststart",
        str(silent_video),
    ]

    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    total_frames = int(DURATION * FPS)

    for frame_number in range(total_frames):
        t = frame_number / FPS
        scene_index = min(len(scenes) - 1, int(np.searchsorted(boundaries[1:], t, side="right")))
        scene_start = boundaries[scene_index]
        scene_duration = durations[scene_index]
        local = max(0.0, min(1.0, (t - scene_start) / scene_duration))
        frame = animate_scene(scenes[scene_index], local, scene_index)

        if scene_index > 0 and t - scene_start < transition:
            previous = animate_scene(scenes[scene_index - 1], 1.0, scene_index - 1)
            mix = smoothstep((t - scene_start) / transition)
            frame = Image.blend(previous, frame, mix)

        add_progress(frame, t)
        process.stdin.write(frame.convert("RGB").tobytes())

    process.stdin.close()
    if process.wait() != 0:
        raise RuntimeError("Video encoding failed")

    write_audio(audio_path)
    subprocess.run(
        [
            str(FFMPEG),
            "-y",
            "-i",
            str(silent_video),
            "-i",
            str(audio_path),
            "-c:v",
            "copy",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-shortest",
            "-movflags",
            "+faststart",
            str(final_video),
        ],
        check=True,
    )

    scenes[0].convert("RGB").resize((1080, 1920), Image.Resampling.LANCZOS).save(
        cover_path,
        quality=94,
        optimize=True,
    )

    silent_video.unlink(missing_ok=True)
    audio_path.unlink(missing_ok=True)
    return final_video, cover_path


if __name__ == "__main__":
    video, cover_image = render()
    print(video)
    print(cover_image)
