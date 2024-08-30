import { BookmarkCheck, History, PhoneCall, Timer, UserRoundPlus, UsersRound } from "lucide-react";
import { useTranslation } from 'react-i18next';

export const useCardData = () => {
  const { t } = useTranslation();

  const cards = [
    {
      count: "30",
      title: t('pages.dashboard.cards.userCall.title'),
      description: t('pages.dashboard.cards.userCall.description'),
      icon: PhoneCall,
      iconSize: "90",
    },
    {
      count: "0",
      title: t('pages.dashboard.cards.waiting.title'),
      description: t('pages.dashboard.cards.waiting.description'),
      icon: UsersRound,
      iconSize: "90",
    },
    {
      count: "134",
      title: t('pages.dashboard.cards.finished.title'),
      description: t('pages.dashboard.cards.finished.description'),
      icon: BookmarkCheck,
      iconSize: "90",
    },
    {
      count: "1h 30m",
      title: t('pages.dashboard.cards.ACT.title'),
      description: t('pages.dashboard.cards.ACT.description'),
      icon: UserRoundPlus,
      iconSize: "90",
    },
    {
      count: "30m",
      title: t('pages.dashboard.cards.AWT.title'),
      description: t('pages.dashboard.cards.AWT.description'),
      icon: History,
      iconSize: "90",
    },
    {
      count: "30",
      title: t('pages.dashboard.cards.active.title'),
      description: t('pages.dashboard.cards.active.description'),
      icon: Timer,
      iconSize: "90",
    },
  ]
  return cards
}

export const chartData = [
  { date: "2024-06-01", desktop: 500, mobile: 250 },
  { date: "2024-06-02", desktop: 470, mobile: 300 },
  { date: "2024-06-03", desktop: 450, mobile: 210 },
  { date: "2024-06-04", desktop: 490, mobile: 320 },
  { date: "2024-06-05", desktop: 410, mobile: 280 },
  { date: "2024-06-06", desktop: 430, mobile: 220 },
  { date: "2024-06-07", desktop: 490, mobile: 300 },
  { date: "2024-06-08", desktop: 500, mobile: 320 },
  { date: "2024-06-09", desktop: 520, mobile: 310 },
  { date: "2024-06-10", desktop: 530, mobile: 340 },
  { date: "2024-06-11", desktop: 450, mobile: 270 },
  { date: "2024-06-12", desktop: 460, mobile: 280 },
  { date: "2024-06-13", desktop: 440, mobile: 290 },
  { date: "2024-06-14", desktop: 480, mobile: 310 },
  { date: "2024-06-15", desktop: 460, mobile: 300 },
  { date: "2024-06-16", desktop: 450, mobile: 250 },
  { date: "2024-06-17", desktop: 490, mobile: 320 },
  { date: "2024-06-18", desktop: 500, mobile: 330 },
  { date: "2024-06-19", desktop: 470, mobile: 310 },
  { date: "2024-06-20", desktop: 460, mobile: 270 },
  { date: "2024-06-21", desktop: 480, mobile: 300 },
  { date: "2024-06-22", desktop: 510, mobile: 350 },
  { date: "2024-06-23", desktop: 490, mobile: 300 },
  { date: "2024-06-24", desktop: 460, mobile: 260 },
  { date: "2024-06-25", desktop: 480, mobile: 280 },
  { date: "2024-06-26", desktop: 500, mobile: 310 },
  { date: "2024-06-27", desktop: 510, mobile: 320 },
  { date: "2024-06-28", desktop: 480, mobile: 300 },
  { date: "2024-06-29", desktop: 450, mobile: 250 },
  { date: "2024-06-30", desktop: 470, mobile: 280 },
  { date: "2024-07-01", desktop: 520, mobile: 330 },
  { date: "2024-07-02", desktop: 530, mobile: 350 },
  { date: "2024-07-03", desktop: 510, mobile: 310 },
  { date: "2024-07-04", desktop: 500, mobile: 300 },
  { date: "2024-07-05", desktop: 540, mobile: 340 },
  { date: "2024-07-06", desktop: 480, mobile: 290 },
  { date: "2024-07-07", desktop: 470, mobile: 280 },
  { date: "2024-07-08", desktop: 460, mobile: 270 },
  { date: "2024-07-09", desktop: 510, mobile: 320 },
  { date: "2024-07-10", desktop: 530, mobile: 350 },
  { date: "2024-07-11", desktop: 550, mobile: 370 },
  { date: "2024-07-12", desktop: 490, mobile: 310 },
  { date: "2024-07-13", desktop: 460, mobile: 270 },
  { date: "2024-07-14", desktop: 480, mobile: 300 },
  { date: "2024-07-15", desktop: 500, mobile: 330 },
  { date: "2024-07-16", desktop: 520, mobile: 350 },
  { date: "2024-07-17", desktop: 470, mobile: 280 },
  { date: "2024-07-18", desktop: 460, mobile: 260 },
  { date: "2024-07-19", desktop: 490, mobile: 310 },
  { date: "2024-07-20", desktop: 510, mobile: 330 },
  { date: "2024-07-21", desktop: 530, mobile: 350 },
  { date: "2024-07-22", desktop: 550, mobile: 370 },
  { date: "2024-07-23", desktop: 510, mobile: 330 },
  { date: "2024-07-24", desktop: 480, mobile: 290 },
  { date: "2024-07-25", desktop: 470, mobile: 280 },
  { date: "2024-07-26", desktop: 520, mobile: 330 },
  { date: "2024-07-27", desktop: 540, mobile: 350 },
  { date: "2024-07-28", desktop: 550, mobile: 360 },
  { date: "2024-07-29", desktop: 500, mobile: 320 },
  { date: "2024-07-30", desktop: 480, mobile: 300 },
  { date: "2024-07-31", desktop: 510, mobile: 330 },
  { date: "2024-08-01", desktop: 530, mobile: 350 },
  { date: "2024-08-02", desktop: 520, mobile: 340 },
  { date: "2024-08-03", desktop: 500, mobile: 320 },
  { date: "2024-08-04", desktop: 540, mobile: 360 },
  { date: "2024-08-05", desktop: 550, mobile: 370 },
  { date: "2024-08-06", desktop: 510, mobile: 330 },
  { date: "2024-08-07", desktop: 500, mobile: 320 },
  { date: "2024-08-08", desktop: 520, mobile: 340 },
  { date: "2024-08-09", desktop: 530, mobile: 350 },
  { date: "2024-08-10", desktop: 510, mobile: 330 },
  { date: "2024-08-11", desktop: 490, mobile: 310 },
  { date: "2024-08-12", desktop: 470, mobile: 280 },
  { date: "2024-08-13", desktop: 480, mobile: 290 },
  { date: "2024-08-14", desktop: 500, mobile: 320 },
  { date: "2024-08-15", desktop: 520, mobile: 340 },
  { date: "2024-08-16", desktop: 540, mobile: 360 },
  { date: "2024-08-17", desktop: 510, mobile: 330 },
  { date: "2024-08-18", desktop: 490, mobile: 310 },
  { date: "2024-08-19", desktop: 470, mobile: 290 },
  { date: "2024-08-20", desktop: 500, mobile: 320 },
  { date: "2024-08-21", desktop: 530, mobile: 350 },
  { date: "2024-08-22", desktop: 550, mobile: 370 },
  { date: "2024-08-23", desktop: 540, mobile: 360 },
  { date: "2024-08-24", desktop: 520, mobile: 340 },
  { date: "2024-08-25", desktop: 500, mobile: 320 },
  { date: "2024-08-26", desktop: 490, mobile: 310 },
  { date: "2024-08-27", desktop: 510, mobile: 330 },
  { date: "2024-08-28", desktop: 530, mobile: 350 },
  { date: "2024-08-29", desktop: 550, mobile: 370 },
  { date: "2024-08-30", desktop: 540, mobile: 360 },
];

export const chartData2 = [
  { date: "2024-06-01", desktop: 800, mobile: 600 },
  { date: "2024-06-02", desktop: 850, mobile: 610 },
  { date: "2024-06-03", desktop: 820, mobile: 620 },
  { date: "2024-06-04", desktop: 810, mobile: 630 },
  { date: "2024-06-05", desktop: 840, mobile: 640 },
  { date: "2024-06-06", desktop: 880, mobile: 650 },
  { date: "2024-06-07", desktop: 860, mobile: 660 },
  { date: "2024-06-08", desktop: 890, mobile: 670 },
  { date: "2024-06-09", desktop: 870, mobile: 680 },
  { date: "2024-06-10", desktop: 850, mobile: 690 },
  { date: "2024-06-11", desktop: 840, mobile: 700 },
  { date: "2024-06-12", desktop: 830, mobile: 710 },
  { date: "2024-06-13", desktop: 820, mobile: 720 },
  { date: "2024-06-14", desktop: 800, mobile: 730 },
  { date: "2024-06-15", desktop: 850, mobile: 740 },
  { date: "2024-06-16", desktop: 870, mobile: 750 },
  { date: "2024-06-17", desktop: 880, mobile: 760 },
  { date: "2024-06-18", desktop: 890, mobile: 770 },
  { date: "2024-06-19", desktop: 860, mobile: 780 },
  { date: "2024-06-20", desktop: 850, mobile: 790 },
  { date: "2024-06-21", desktop: 880, mobile: 800 },
  { date: "2024-06-22", desktop: 860, mobile: 810 },
  { date: "2024-06-23", desktop: 850, mobile: 820 },
  { date: "2024-06-24", desktop: 840, mobile: 830 },
  { date: "2024-06-25", desktop: 820, mobile: 840 },
  { date: "2024-06-26", desktop: 800, mobile: 850 },
  { date: "2024-06-27", desktop: 850, mobile: 860 },
  { date: "2024-06-28", desktop: 870, mobile: 870 },
  { date: "2024-06-29", desktop: 880, mobile: 880 },
  { date: "2024-06-30", desktop: 890, mobile: 890 },
  { date: "2024-07-01", desktop: 860, mobile: 900 },
  { date: "2024-07-02", desktop: 850, mobile: 910 },
  { date: "2024-07-03", desktop: 840, mobile: 920 },
  { date: "2024-07-04", desktop: 830, mobile: 930 },
  { date: "2024-07-05", desktop: 820, mobile: 940 },
  { date: "2024-07-06", desktop: 810, mobile: 950 },
  { date: "2024-07-07", desktop: 800, mobile: 960 },
  { date: "2024-07-08", desktop: 850, mobile: 970 },
  { date: "2024-07-09", desktop: 860, mobile: 980 },
  { date: "2024-07-10", desktop: 870, mobile: 990 },
  { date: "2024-07-11", desktop: 880, mobile: 1000 },
  { date: "2024-07-12", desktop: 890, mobile: 1010 },
  { date: "2024-07-13", desktop: 860, mobile: 1020 },
  { date: "2024-07-14", desktop: 850, mobile: 1030 },
  { date: "2024-07-15", desktop: 840, mobile: 1040 },
  { date: "2024-07-16", desktop: 830, mobile: 1050 },
  { date: "2024-07-17", desktop: 820, mobile: 1060 },
  { date: "2024-07-18", desktop: 810, mobile: 1070 },
  { date: "2024-07-19", desktop: 800, mobile: 1080 },
  { date: "2024-07-20", desktop: 850, mobile: 1090 },
  { date: "2024-07-21", desktop: 860, mobile: 1100 },
  { date: "2024-07-22", desktop: 870, mobile: 1110 },
  { date: "2024-07-23", desktop: 880, mobile: 1120 },
  { date: "2024-07-24", desktop: 890, mobile: 1130 },
  { date: "2024-07-25", desktop: 860, mobile: 1140 },
  { date: "2024-07-26", desktop: 850, mobile: 1150 },
  { date: "2024-07-27", desktop: 840, mobile: 1160 },
  { date: "2024-07-28", desktop: 830, mobile: 1170 },
  { date: "2024-07-29", desktop: 820, mobile: 1180 },
  { date: "2024-07-30", desktop: 810, mobile: 1190 },
  { date: "2024-07-31", desktop: 800, mobile: 1200 },
  { date: "2024-08-01", desktop: 850, mobile: 1210 },
  { date: "2024-08-02", desktop: 860, mobile: 1220 },
  { date: "2024-08-03", desktop: 870, mobile: 1230 },
  { date: "2024-08-04", desktop: 880, mobile: 1240 },
  { date: "2024-08-05", desktop: 890, mobile: 1250 },
  { date: "2024-08-06", desktop: 860, mobile: 1260 },
  { date: "2024-08-07", desktop: 850, mobile: 1270 },
  { date: "2024-08-08", desktop: 840, mobile: 1280 },
  { date: "2024-08-09", desktop: 830, mobile: 1290 },
  { date: "2024-08-10", desktop: 820, mobile: 1300 },
  { date: "2024-08-11", desktop: 810, mobile: 1310 },
  { date: "2024-08-12", desktop: 800, mobile: 1320 },
  { date: "2024-08-13", desktop: 850, mobile: 1330 },
  { date: "2024-08-14", desktop: 860, mobile: 1340 },
  { date: "2024-08-15", desktop: 870, mobile: 1350 },
  { date: "2024-08-16", desktop: 880, mobile: 1360 },
  { date: "2024-08-17", desktop: 890, mobile: 1370 },
  { date: "2024-08-18", desktop: 860, mobile: 1380 },
  { date: "2024-08-19", desktop: 850, mobile: 1390 },
  { date: "2024-08-20", desktop: 840, mobile: 1400 },
  { date: "2024-08-21", desktop: 830, mobile: 1410 },
  { date: "2024-08-22", desktop: 820, mobile: 1420 },
  { date: "2024-08-23", desktop: 810, mobile: 1430 },
  { date: "2024-08-24", desktop: 800, mobile: 1440 },
  { date: "2024-08-25", desktop: 850, mobile: 1450 },
  { date: "2024-08-26", desktop: 860, mobile: 1460 },
  { date: "2024-08-27", desktop: 870, mobile: 1470 },
  { date: "2024-08-28", desktop: 880, mobile: 1480 },
  { date: "2024-08-29", desktop: 890, mobile: 1490 },
  { date: "2024-08-30", desktop: 860, mobile: 1500 },
];
