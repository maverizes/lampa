"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header className={styles.header}>
      {/* Зеленая полоса сверху */}
      <div className={styles.topBar} />

      {/* Верхний ряд */}
      <div className={styles.topRow}>
        <div className={styles.topBarLeft}>
          <button className={styles.langBtn}>EN</button>
          <a href="/catalog.pdf" download className={styles.downloadBtn}>
            Скачать каталог
          </a>
        </div>

        <div className={styles.searchContainer}>
          <svg
            className={styles.searchIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div className={styles.topBarRight}>
          <button className={styles.iconBtn} title="Избранное">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>

          {/* Авторизация */}
          {session ? (
            <div className={styles.userProfile}>
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className={styles.userAvatar}
                />
              ) : (
                <div className={styles.userAvatarFallback}>
                  {session.user?.name
                    ? session.user.name[0].toUpperCase()
                    : "U"}
                </div>
              )}
              <span className={styles.userName}>{session.user?.name}</span>
              <button onClick={() => signOut()} className={styles.logoutBtn}>
                Выйти
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className={styles.authBtn}>
              Войти
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Нижний ряд */}
      <div className={styles.bottomRow}>
        <Link href="/" className={styles.logo}>
          HTL.
        </Link>

        <nav className={styles.navigation}>
          <Link href="/catalog">Каталог</Link>
          <Link href="/AboutPage">О компании</Link>
          <Link href="/portfolio">Портфолио</Link>
          <Link href="/WhereToBuyPage">Где купить?</Link>
          <Link href="/new">Новости</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>

        <a href="tel:+74951251007" className={styles.phone}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          +7 (495) 125-10-07
        </a>
      </div>
    </header>
  );
}
