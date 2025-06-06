// import { prisma } from "@/lib/prisma";
import { BookmarkManagerClient } from "@/components/bookmark-manager-client";
import { TopicWithBookmarkCount } from "@/hooks/use-topics";
import { dummyTopics } from "@/lib/dummy-data";

/**
 * 初期表示用のトピック一覧を取得する
 *
 * プレビュー版では、ダミーデータを返します。
 * 本来はブックマーク数を含むトピック情報を、更新日時の降順で取得します。
 */
async function getInitialTopics(): Promise<TopicWithBookmarkCount[]> {
  try {
    // プレビュー版ではダミーデータを使用
    return dummyTopics;

    // 実際のアプリでは以下のコードでPrismaからデータを取得
    /*
    const topics = await prisma.topic.findMany({
      include: {
        _count: {
          select: { bookmarks: true },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Prismaの_countをbookmarkCountプロパティに変換
    return topics.map((topic) => ({
      ...topic,
      bookmarkCount: topic._count.bookmarks,
    }));
    */
  } catch (error) {
    console.error("Error fetching initial topics:", error);
    // エラー時は空配列を返してアプリケーションの継続を保証
    return [];
  }
}

/**
 * ブックマーク管理ページのメインコンポーネント
 *
 * プレビュー版では、ダミーデータを使用してトピック一覧を取得し、
 * クライアントコンポーネントに渡します。
 */
export default async function BookmarkManagerPage() {
  const initialTopics = await getInitialTopics();

  return <BookmarkManagerClient initialTopics={initialTopics} />;
}
