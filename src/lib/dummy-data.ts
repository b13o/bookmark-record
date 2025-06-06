import { TopicWithBookmarkCount } from "@/hooks/use-topics";

// プレビュー用のダミートピックデータ
export const dummyTopics: TopicWithBookmarkCount[] = [
  {
    id: "1",
    emoji: "💻",
    title: "プログラミング",
    description:
      "プログラミングに関するリソースやチュートリアル。\nReact、Next.js、TypeScriptなどを中心とした、学習に役立つ情報をまとめています。\n\n初心者から上級者まで参考になる情報を収集しています。",
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-03-01T15:30:00Z"),
    bookmarkCount: 8,
  },
  {
    id: "2",
    emoji: "🎨",
    title: "デザイン",
    description: "UI/UXデザイン、Web デザインのトレンドやツールについて",
    createdAt: new Date("2024-02-01T14:00:00Z"),
    updatedAt: new Date("2024-02-28T16:45:00Z"),
    bookmarkCount: 5,
  },
  {
    id: "4",
    emoji: "🛠️",
    title: "開発ツール",
    description: "開発効率を上げるツールやライブラリ",
    createdAt: new Date("2024-02-10T13:15:00Z"),
    updatedAt: new Date("2024-03-03T14:00:00Z"),
    bookmarkCount: 6,
  },
];

// プレビュー用のダミーブックマークデータ
export const dummyBookmarks = {
  "1": [
    // プログラミング
    {
      id: "b0",
      url: "https://react-road.b13o.com",
      description:
        "React Road - ロードマップに沿った、実践的な React の課題の一覧",
      topicId: "1",
      createdAt: new Date("2024-01-18T16:45:00Z"),
      updatedAt: new Date("2024-01-18T16:45:00Z"),
    },
    {
      id: "b1",
      url: "https://react.dev/",
      description: "React 公式ドキュメント - 最新のReactの学習に最適",
      topicId: "1",
      createdAt: new Date("2024-01-15T10:30:00Z"),
      updatedAt: new Date("2024-01-15T10:30:00Z"),
    },
    {
      id: "b2",
      url: "https://nextjs.org/docs",
      description: "Next.js 公式ドキュメント - フルスタック開発の決定版",
      topicId: "1",
      createdAt: new Date("2024-01-16T14:00:00Z"),
      updatedAt: new Date("2024-01-16T14:00:00Z"),
    },
    {
      id: "b4",
      url: "https://ui.shadcn.com/",
      description: "shadcn/ui - 美しく再利用可能なコンポーネント",
      topicId: "1",
      createdAt: new Date("2024-02-01T09:15:00Z"),
      updatedAt: new Date("2024-02-01T09:15:00Z"),
    },
    {
      id: "b5",
      url: "https://b13o.com",
      description: "b13o - React 開発を学習するコミュニティ",
      topicId: "1",
      createdAt: new Date("2024-01-20T11:20:00Z"),
      updatedAt: new Date("2024-01-20T11:20:00Z"),
    },
    {
      id: "b6",
      url: "https://prisma.io/docs",
      description: "Prisma ドキュメント - 次世代のTypeScript ORM",
      topicId: "1",
      createdAt: new Date("2024-02-05T15:30:00Z"),
      updatedAt: new Date("2024-02-05T15:30:00Z"),
    },
    {
      id: "b7",
      url: "https://swr.vercel.app/ja",
      description: "SWR - データ取得のためのReact フック",
      topicId: "1",
      createdAt: new Date("2024-02-15T13:45:00Z"),
      updatedAt: new Date("2024-02-15T13:45:00Z"),
    },
    {
      id: "b8",
      url: "https://zenn.dev/kazzyfrog",
      description: "Zenn での技術ブログ（@kazzyfrog）",
      topicId: "1",
      createdAt: new Date("2024-03-01T10:00:00Z"),
      updatedAt: new Date("2024-03-01T10:00:00Z"),
    },
  ],
  "2": [
    // デザイン
    {
      id: "b9",
      url: "https://www.figma.com/",
      description: "Figma - 協業可能なデザインツール",
      topicId: "2",
      createdAt: new Date("2024-02-01T14:30:00Z"),
      updatedAt: new Date("2024-02-01T14:30:00Z"),
    },
    {
      id: "b10",
      url: "https://dribbble.com/",
      description: "Dribbble - デザインインスピレーションの宝庫",
      topicId: "2",
      createdAt: new Date("2024-02-03T16:00:00Z"),
      updatedAt: new Date("2024-02-03T16:00:00Z"),
    },
    {
      id: "b11",
      url: "https://material.io/design",
      description: "Material Design - Googleのデザインシステム",
      topicId: "2",
      createdAt: new Date("2024-02-10T11:45:00Z"),
      updatedAt: new Date("2024-02-10T11:45:00Z"),
    },
    {
      id: "b12",
      url: "https://www.behance.net/",
      description: "Behance - クリエイティブ作品のポートフォリオサイト",
      topicId: "2",
      createdAt: new Date("2024-02-20T09:30:00Z"),
      updatedAt: new Date("2024-02-20T09:30:00Z"),
    },
    {
      id: "b13",
      url: "https://coolors.co/",
      description: "Coolors - カラーパレット生成ツール",
      topicId: "2",
      createdAt: new Date("2024-02-28T14:15:00Z"),
      updatedAt: new Date("2024-02-28T14:15:00Z"),
    },
  ],
  "4": [
    // 開発ツール
    {
      id: "b26",
      url: "https://code.visualstudio.com/",
      description: "Visual Studio Code - 高機能な無料コードエディタ",
      topicId: "4",
      createdAt: new Date("2024-02-10T13:30:00Z"),
      updatedAt: new Date("2024-02-10T13:30:00Z"),
    },
    {
      id: "b27",
      url: "https://www.postman.com/",
      description: "Postman - API開発・テストツール",
      topicId: "4",
      createdAt: new Date("2024-02-12T16:15:00Z"),
      updatedAt: new Date("2024-02-12T16:15:00Z"),
    },
    {
      id: "b28",
      url: "https://vercel.com/",
      description: "Vercel - フロントエンドデプロイメントプラットフォーム",
      topicId: "4",
      createdAt: new Date("2024-02-15T10:45:00Z"),
      updatedAt: new Date("2024-02-15T10:45:00Z"),
    },
    {
      id: "b29",
      url: "https://www.netlify.com/",
      description: "Netlify - Jamstackサイトのためのプラットフォーム",
      topicId: "4",
      createdAt: new Date("2024-02-20T14:00:00Z"),
      updatedAt: new Date("2024-02-20T14:00:00Z"),
    },
    {
      id: "b30",
      url: "https://eslint.org/",
      description: "ESLint - JavaScript/TypeScriptのコード品質ツール",
      topicId: "4",
      createdAt: new Date("2024-02-25T11:30:00Z"),
      updatedAt: new Date("2024-02-25T11:30:00Z"),
    },
    {
      id: "b31",
      url: "https://prettier.io/",
      description: "Prettier - コードフォーマッター",
      topicId: "4",
      createdAt: new Date("2024-03-03T09:15:00Z"),
      updatedAt: new Date("2024-03-03T09:15:00Z"),
    },
  ],
};

export type BookmarkType = {
  id: string;
  url: string;
  description: string | null;
  topicId: string;
  createdAt: Date;
  updatedAt: Date;
};
