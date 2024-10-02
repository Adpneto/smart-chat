import { Bolt, BookUser, BotMessageSquare, Cable, ClipboardCheck, Code, FolderTree, Info, LayoutDashboard, ListOrdered, MessageCircleMore, MessageCircleReply, MessageSquareText, NotebookPen, Server, Shield, Tags, UsersRound, Wallet, Workflow } from "lucide-react";
import { type NavItem } from "@/types";
import { useTranslation } from 'react-i18next';

export const NavItems = () => {
  const { t } = useTranslation()

  const NavItems: NavItem[] = [
    {
      title: t('components.sidebar.dashboard'),
      icon: LayoutDashboard,
      href: "/",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.services'),
      icon: MessageCircleMore,
      href: "/services",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.kanban'),
      icon: Server,
      href: "/kanban",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.quickResponses'),
      icon: MessageCircleReply,
      href: "/quickresponses",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.tasks'),
      icon: ClipboardCheck,
      href: "/tasks",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.contacts'),
      icon: BookUser,
      href: "/contacts",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.Appointments'),
      icon: NotebookPen,
      href: "/appointments",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.tags'),
      icon: Tags,
      href: "/tags",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.internalChat'),
      icon: MessageSquareText,
      href: "/internalchat",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.help'),
      icon: Info,
      href: "/help",
      color: "text-sky-500",
    },
    {
      title: t('components.sidebar.admin'),
      icon: Shield,
      href: "/admin",
      color: "text-orange-500",
      isChidren: true,
      children: [
        {
          title: t('components.sidebar.prompts'),
          icon: BotMessageSquare,
          color: "text-red-500",
          href: "/prompts",
        },
        {
          title: t('components.sidebar.integrations'),
          icon: Workflow,
          color: "text-red-500",
          href: "/integrations",
        },
        {
          title: t('components.sidebar.conections'),
          icon: Cable,
          color: "text-red-500",
          href: "/conections",
        },
        {
          title: t('components.sidebar.listArchives'),
          icon: FolderTree,
          color: "text-red-500",
          href: "/listarchives",
        },
        {
          title: t('components.sidebar.queue'),
          icon: ListOrdered,
          color: "text-red-500",
          href: "/queue",
        },
        {
          title: t('components.sidebar.users'),
          icon: UsersRound,
          color: "text-red-500",
          href: "/users",
        },
        {
          title: t('components.sidebar.api'),
          icon: Code,
          color: "text-red-500",
          href: "/api",
        },
        {
          title: t('components.sidebar.financial'),
          icon: Wallet,
          color: "text-red-500",
          href: "/payments",
        },
        {
          title: t('components.sidebar.configs'),
          icon: Bolt,
          color: "text-red-500",
          href: "/configs",
        },
      ],
    },
  ]
  return NavItems
}