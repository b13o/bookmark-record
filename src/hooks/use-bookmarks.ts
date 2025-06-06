import { useState, useEffect } from "react";
// import useSWR from "swr";
// import { Bookmark as BookmarkType } from "@prisma/client";
import { dummyBookmarks, BookmarkType } from "@/lib/dummy-data";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * ブックマーク管理機能を提供するカスタムフック（プレビュー版）
 *
 * プレビュー版では、ダミーデータを使用し、実際のAPI呼び出しは
 * アラート表示で代替します。状態管理はuseStateで行います。
 * 指定されたトピックのブックマークの取得、作成、更新、削除、
 * および一括作成機能を提供します。
 */
export const useBookmarks = (
  topicId: string | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _mutateTopics?: () => void // プレビュー版では使用しないがインターフェースの互換性のため残す
) => {
  // プレビュー版では、ダミーデータから該当のブックマークを取得
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  // SWRを使用してブックマークデータを取得・キャッシュ
  // const { data, error, mutate } = useSWR<BookmarkType[]>(
  //   topicId ? `/api/bookmarks?topicId=${topicId}` : null,
  //   fetcher
  // );

  const [editingBookmark, setEditingBookmark] = useState<BookmarkType | null>(
    null
  );
  const [bookmarkForm, setBookmarkForm] = useState({
    topicId: topicId || "",
    url: "",
    description: "",
  });
  const [bulkForm, setBulkForm] = useState({
    topicId: topicId || "",
    urls: "",
  });

  // トピックIDが変更された時にブックマークを更新
  useEffect(() => {
    if (topicId && dummyBookmarks[topicId as keyof typeof dummyBookmarks]) {
      setBookmarks(dummyBookmarks[topicId as keyof typeof dummyBookmarks]);
    } else {
      setBookmarks([]);
    }
  }, [topicId]);

  // 選択されたトピックが変更された時にフォームのトピックIDを更新
  useEffect(() => {
    setBookmarkForm((prev) => ({ ...prev, topicId: topicId || "" }));
    setBulkForm((prev) => ({ ...prev, topicId: topicId || "" }));
  }, [topicId]);

  const resetBookmarkForms = () => {
    setBookmarkForm({ topicId: topicId || "", url: "", description: "" });
    setBulkForm({ topicId: topicId || "", urls: "" });
    setEditingBookmark(null);
  };

  const openEditBookmark = (bookmark: BookmarkType) => {
    setEditingBookmark(bookmark);
    setBookmarkForm({
      topicId: bookmark.topicId,
      url: bookmark.url,
      description: bookmark.description || "",
    });
  };

  const handleCreateBookmark = async () => {
    try {
      // プレビュー版では、ローカル状態に新しいブックマークを追加
      const newBookmark: BookmarkType = {
        id: `new-bookmark-${Date.now()}`,
        url: bookmarkForm.url,
        description: bookmarkForm.description,
        topicId: bookmarkForm.topicId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setBookmarks((prev) => [newBookmark, ...prev]);
      resetBookmarkForms();

      // プレビュー版用のメッセージ
      alert("新しいブックマークを作成しました！\n（これはプレビュー版です）");
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: bookmarkForm.url,
          description: bookmarkForm.description,
          topicId: bookmarkForm.topicId,
        }),
      });

      if (response.ok) {
        // ブックマークリストとトピックリスト（ブックマーク数更新のため）を再取得
        await mutate();
        if (mutateTopics) await mutateTopics();
        resetBookmarkForms();
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error creating bookmark:", error);
      return false;
    }
  };

  const handleUpdateBookmark = async () => {
    if (!editingBookmark) return false;

    try {
      // プレビュー版では、ローカル状態を更新
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === editingBookmark.id
            ? {
                ...bookmark,
                url: bookmarkForm.url,
                description: bookmarkForm.description,
                topicId: bookmarkForm.topicId,
                updatedAt: new Date(),
              }
            : bookmark
        )
      );

      resetBookmarkForms();

      // プレビュー版用のメッセージ
      alert("ブックマークを更新しました！\n（これはプレビュー版です）");
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch(`/api/bookmarks/${editingBookmark.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: bookmarkForm.url,
          description: bookmarkForm.description,
          topicId: bookmarkForm.topicId,
        }),
      });

      if (response.ok) {
        await mutate();
        if (mutateTopics) await mutateTopics();
        resetBookmarkForms();
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error updating bookmark:", error);
      return false;
    }
  };

  /**
   * 複数のURLを一括でブックマークとして作成する
   * 改行区切りのURLテキストを解析して個別のブックマークを作成
   */
  const handleBulkCreate = async () => {
    const urls = bulkForm.urls.split("\n").filter((url) => url.trim());

    try {
      // プレビュー版では、ローカル状態に複数のブックマークを追加
      const newBookmarks = urls.map((url, index) => ({
        id: `bulk-bookmark-${Date.now()}-${index}`,
        url: url.trim(),
        description: null,
        topicId: bulkForm.topicId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      setBookmarks((prev) => [...newBookmarks, ...prev]);
      resetBookmarkForms();

      // プレビュー版用のメッセージ
      alert(
        `${urls.length}件のブックマークを一括作成しました！\n（これはプレビュー版です）`
      );
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch("/api/bookmarks/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls: urls.map((url) => url.trim()),
          topicId: bulkForm.topicId,
        }),
      });

      if (response.ok) {
        await mutate();
        if (mutateTopics) await mutateTopics();
        resetBookmarkForms();
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error creating bulk bookmarks:", error);
      return false;
    }
  };

  const handleDeleteBookmark = async (bookmarkId: string) => {
    try {
      // プレビュー版では、ローカル状態から削除
      const bookmarkToDelete = bookmarks.find((b) => b.id === bookmarkId);
      if (!bookmarkToDelete) return false;

      // 確認ダイアログ
      if (
        !confirm(
          `ブックマーク「${bookmarkToDelete.url}」を削除しますか？\n（これはプレビュー版です）`
        )
      ) {
        return false;
      }

      setBookmarks((prev) =>
        prev.filter((bookmark) => bookmark.id !== bookmarkId)
      );

      alert("ブックマークを削除しました！\n（これはプレビュー版です）");
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // ブックマーク削除後、関連するデータを再取得
        await mutate();
        if (mutateTopics) await mutateTopics();
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      return false;
    }
  };

  // プレビュー版用のmutate関数（何もしない）
  const mutateBookmarks = async () => {
    // プレビュー版では何もしない
  };

  return {
    // データ
    bookmarks: bookmarks || [],
    isLoading: false, // プレビュー版では常にfalse
    isError: false, // プレビュー版では常にfalse

    // フォーム状態
    bookmarkForm,
    setBookmarkForm,
    bulkForm,
    setBulkForm,
    editingBookmark,

    // 操作関数
    openEditBookmark,
    resetBookmarkForms,
    handleCreateBookmark,
    handleUpdateBookmark,
    handleBulkCreate,
    handleDeleteBookmark,
    mutateBookmarks,
  };
};
