import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import Button, { BUTTON_TYPE } from './atoms/Button';
import { IconFacebook, IconInstagram, IconSoundcloud } from './atoms/Icons';

enum DIRECTION {
  OPEN = 'open',
  CLOSE = 'close',
}

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const wrapperMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeline = useRef(gsap.timeline({ paused: true }));

  const links = [
    { label: 'accueil', href: '/' },
    { label: 'à propos', href: '/about' },
    { label: 'artistes', href: '/artists' },
    { label: 'mixs', href: '/mixs' },
    { label: 'contact', href: '/contact' },
  ];

  const playAnimation = (direction: DIRECTION) => {
    if (!menuRef.current || !wrapperMenuRef.current) return;

    const linksToAnim = Array.from(menuRef.current.querySelectorAll('.animate-link'));
    const socialsToAnim = Array.from(menuRef.current.querySelectorAll('.animate-social'));

    if (direction === DIRECTION.OPEN) {
      timeline.current
        .add(
          gsap.fromTo(
            wrapperMenuRef.current,
            { visibility: 'hidden', scale: 0.9 },
            { visibility: 'visible', scale: 1, duration: 0 },
          ),
        )
        .add(
          gsap.fromTo(
            menuRef.current,
            { scaleY: 0.8, opacity: 0 },
            { scaleY: 1, opacity: 1, ease: 'power4.inOut', duration: 0.4 },
          ),
        )
        .add(
          gsap.fromTo(
            linksToAnim,
            { y: -24, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power4.out' },
          ),
          '-=0.4',
        )
        .add(
          gsap.fromTo(
            socialsToAnim,
            { x: -24, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'power4.out' },
          ),
          '-=0.4',
        )
        .play();
    } else if (direction === DIRECTION.CLOSE) {
      timeline.current
        .add(
          gsap.fromTo(
            socialsToAnim.reverse(),
            { x: 0, opacity: 1 },
            { x: -24, opacity: 0, stagger: 0.1, duration: 0.4, ease: 'power4.in' },
          ),
        )
        .add(
          gsap.fromTo(
            linksToAnim.reverse(),
            { y: 0, opacity: 1 },
            { y: -24, opacity: 0, stagger: 0.1, duration: 0.4, ease: 'power4.in' },
          ),
          '-=0.4',
        )
        .add(
          gsap.fromTo(
            menuRef.current,
            { scaleY: 1, opacity: 1 },
            { scaleY: 0.8, opacity: 0, ease: 'power4.inOut', duration: 0.4 },
          ),
          '-=0.4',
        )
        .add(
          gsap.fromTo(
            wrapperMenuRef.current,
            { visibility: 'visible', scale: 1 },
            { visibility: 'hidden', scale: 0.9, duration: 0 },
          ),
        )
        .play();
    }
  };

  const openMenu = () => {
    setIsOpen(true);
    playAnimation(DIRECTION.OPEN);
  };

  const closeMenu = () => {
    setIsOpen(false);
    playAnimation(DIRECTION.CLOSE);
  };

  const handleLinkClick = (link: string) => {
    if (pathname === link) {
      closeMenu();
    } else {
      setTimeout(() => {
        closeMenu();
      }, 400);
    }
  };

  return (
    <div className="!flex nav:!hidden">
      <Button
        type={BUTTON_TYPE.ICON}
        as="button"
        onClick={isOpen ? closeMenu : openMenu}
        className="group/burger"
      >
        <div className="flex h-full w-full flex-col items-end justify-between py-[20px]">
          <div
            className={clsx(
              isOpen ? 'translate-y-2 rotate-45' : 'translate-y-0 rotate-0',
              'h-[2px] w-full bg-white transition-transform',
            )}
          ></div>
          <div
            className={clsx(
              isOpen ? 'w-full scale-x-0' : 'w-1/3 scale-x-100',
              'h-[2px] bg-white transition-[transform,width] group-hover/burger:w-full',
            )}
          ></div>
          <div
            className={clsx(
              isOpen ? 'w-full -translate-y-2 -rotate-45' : 'w-2/3 translate-y-0 rotate-0',
              'h-[2px] bg-white transition-[transform,width] group-hover/burger:w-full',
            )}
          ></div>
        </div>
      </Button>
      <div
        ref={wrapperMenuRef}
        className="invisible fixed inset-0 -z-10 h-svh w-screen scale-0 px-4 pb-y-default pt-header nav:px-x-default"
      >
        <div
          ref={menuRef}
          className="blur-medium flex h-full w-full origin-top scale-y-0 flex-col justify-between px-x-default py-y-default opacity-0"
        >
          <div className="flex flex-col">
            {links.map(({ label, href }) => (
              <Link
                scroll={false}
                key={label}
                href={href}
                onClick={() => handleLinkClick(href)}
                className="animate-link group/burger-item relative flex -translate-y-6 items-center py-3 text-xl uppercase text-white opacity-0"
              >
                <div className="absolute h-1 w-1 scale-0 rounded-full bg-white opacity-0 transition-[transform,opacity] group-hover/burger-item:scale-100 group-hover/burger-item:opacity-100"></div>
                <span className="transition-[padding] group-hover/burger-item:pl-4">{label}</span>
              </Link>
            ))}
          </div>
          <div className="flex gap-6">
            <Link
              href="https://www.instagram.com/2.26tours"
              target="_blank"
              className="animate-social -translate-x-6 text-xl uppercase text-white opacity-0"
            >
              <IconInstagram />
            </Link>
            <Link
              href="https://www.facebook.com/2.26tours"
              target="_blank"
              className="animate-social -translate-x-6 text-xl uppercase text-white opacity-0"
            >
              <IconFacebook />
            </Link>
            <Link
              href="https://soundcloud.com/2-26-tours"
              target="_blank"
              className="animate-social -translate-x-6 text-xl uppercase text-white opacity-0"
            >
              <IconSoundcloud />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;
