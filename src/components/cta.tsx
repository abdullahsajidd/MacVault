import { forwardRef, type ButtonHTMLAttributes, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

function AnimatedButtonLabel({ children }: { children: string }) {
  const letters = Array.from(children);

  return (
    <span className="button-label" aria-hidden="true">
      {[0, 1].map((row) => (
        <span className="button-label-row" key={row}>
          {letters.map((letter, index) => (
            <span
              className="button-label-letter"
              style={{ transitionDelay: `${index * 18}ms` } as CSSProperties}
              key={`${row}-${letter}-${index}`}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

type SharedProps = {
  children: string;
  variant?: "primary" | "secondary" | "dark";
  icon?: LucideIcon;
  className?: string;
};

type LinkCtaProps = SharedProps & {
  href: string;
  asButton?: false;
};

type ButtonCtaProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    asButton: true;
    href?: never;
  };

export type CtaProps = LinkCtaProps | ButtonCtaProps;

export const Cta = forwardRef<HTMLButtonElement, CtaProps>(function Cta(props, ref) {
  const {
    children,
    variant = "primary",
    icon: Icon = ArrowRight,
    className = "",
  } = props;
  const classes = `button-primary button-${variant} ${className}`;
  const content = (
    <>
      <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      <AnimatedButtonLabel>{children}</AnimatedButtonLabel>
      <span className="sr-only">{children}</span>
    </>
  );

  if (props.asButton) {
    const {
      asButton: _asButton,
      icon: _icon,
      variant: _variant,
      className: _className,
      children: _children,
      ...buttonProps
    } = props;
    void [_asButton, _icon, _variant, _className, _children];

    return (
      <button className={classes} ref={ref} {...buttonProps}>
        {content}
      </button>
    );
  }

  if (props.href.startsWith("/") || props.href.startsWith("#")) {
    return (
      <Link className={classes} href={props.href}>
        {content}
      </Link>
    );
  }

  return (
    <a className={classes} href={props.href}>
      {content}
    </a>
  );
});
