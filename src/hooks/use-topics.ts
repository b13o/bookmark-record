import { useState, useEffect } from "react";
// import useSWR from "swr";
// import { Topic } from "@prisma/client";
import { dummyTopics } from "@/lib/dummy-data";

// APIから返される拡張されたTopic型（ブックマーク数を含む）
export interface TopicWithBookmarkCount {
  id: string;
  emoji: string | null;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  bookmarkCount: number;
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * トピック管理機能を提供するカスタムフック（プレビュー版）
 *
 * プレビュー版では、ダミーデータを使用し、実際のAPI呼び出しは
 * アラート表示で代替します。状態管理はuseStateで行います。
 */
export const useTopics = (initialTopics: TopicWithBookmarkCount[] = []) => {
  // プレビュー版では、シンプルなuseStateを使用
  const [topics, setTopics] = useState<TopicWithBookmarkCount[]>(
    initialTopics.length > 0 ? initialTopics : dummyTopics
  );

  // const { data, error, mutate } = useSWR<TopicWithBookmarkCount[]>(
  //   "/api/topics",
  //   fetcher
  // );

  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [editingTopic, setEditingTopic] =
    useState<TopicWithBookmarkCount | null>(null);
  const [topicForm, setTopicForm] = useState({
    emoji: "",
    title: "",
    description: "",
  });

  // SWRデータが利用可能な場合はそれを使用、そうでなければ初期データを使用
  // const currentTopics = data && data.length > 0 ? data : initialTopics;
  const currentTopics = topics;
  const selectedTopic = currentTopics.find((t) => t.id === selectedTopicId);

  // トピックが存在する場合、最初のトピックを自動選択
  useEffect(() => {
    if (currentTopics.length > 0 && !selectedTopicId) {
      setSelectedTopicId(currentTopics[0].id);
    }
  }, [currentTopics, selectedTopicId]);

  const resetTopicForm = () => {
    setTopicForm({ emoji: "", title: "", description: "" });
    setEditingTopic(null);
  };

  const openEditTopic = (topic: TopicWithBookmarkCount) => {
    setEditingTopic(topic);
    setTopicForm({
      emoji: topic.emoji || "",
      title: topic.title,
      description: topic.description || "",
    });
  };

  const handleCreateTopic = async () => {
    try {
      // プレビュー版では、実際にトピックを追加（ローカル状態のみ）
      const newTopic: TopicWithBookmarkCount = {
        id: `new-${Date.now()}`,
        emoji: topicForm.emoji || "📁",
        title: topicForm.title,
        description: topicForm.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        bookmarkCount: 0,
      };

      setTopics((prev) => [newTopic, ...prev]);
      resetTopicForm();

      // 初回作成時は新しいトピックを自動選択
      if (!selectedTopicId) {
        setSelectedTopicId(newTopic.id);
      }

      // プレビュー版用のメッセージ
      alert("新しいトピックを作成しました！\n（これはプレビュー版です）");
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: topicForm.title,
          description: topicForm.description,
          emoji: topicForm.emoji || "📁",
        }),
      });

      if (response.ok) {
        const newTopic = await response.json();
        await mutate();
        resetTopicForm();
        if (!selectedTopicId) {
          setSelectedTopicId(newTopic.id);
        }
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error creating topic:", error);
      return false;
    }
  };

  const handleUpdateTopic = async () => {
    if (!editingTopic) return false;

    try {
      // プレビュー版では、ローカル状態を更新
      setTopics((prev) =>
        prev.map((topic) =>
          topic.id === editingTopic.id
            ? {
                ...topic,
                emoji: topicForm.emoji,
                title: topicForm.title,
                description: topicForm.description,
                updatedAt: new Date(),
              }
            : topic
        )
      );

      resetTopicForm();

      // プレビュー版用のメッセージ
      alert("トピックを更新しました！\n（これはプレビュー版です）");
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch(`/api/topics/${editingTopic.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: topicForm.title,
          description: topicForm.description,
          emoji: topicForm.emoji,
        }),
      });

      if (response.ok) {
        await mutate();
        resetTopicForm();
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error updating topic:", error);
      return false;
    }
  };

  const handleDeleteTopic = async (topicId: string) => {
    try {
      // プレビュー版では、ローカル状態から削除
      const topicToDelete = topics.find((t) => t.id === topicId);
      if (!topicToDelete) return false;

      // 確認ダイアログ
      if (
        !confirm(
          `「${topicToDelete.title}」を削除しますか？\n（これはプレビュー版です）`
        )
      ) {
        return false;
      }

      setTopics((prev) => prev.filter((topic) => topic.id !== topicId));

      // 削除されたトピックが選択中の場合、残りのトピックから最初のものを選択
      if (selectedTopicId === topicId && topics.length > 1) {
        const remainingTopics = topics.filter((t) => t.id !== topicId);
        setSelectedTopicId(remainingTopics[0]?.id || "");
      }

      alert("トピックを削除しました！\n（これはプレビュー版です）");
      return true;

      // 実際のAPI呼び出しはコメントアウト
      /*
      const response = await fetch(`/api/topics/${topicId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await mutate();
        if (selectedTopicId === topicId && currentTopics.length > 1) {
          const remainingTopics = currentTopics.filter((t) => t.id !== topicId);
          setSelectedTopicId(remainingTopics[0]?.id || "");
        }
        return true;
      }
      return false;
      */
    } catch (error) {
      console.error("Error deleting topic:", error);
      return false;
    }
  };

  // プレビュー版用のmutate関数（何もしない）
  const mutateTopics = async () => {
    // プレビュー版では何もしない
  };

  return {
    // データ
    topics: currentTopics,
    selectedTopic,
    selectedTopicId,
    isLoading: false, // プレビュー版では常にfalse
    isError: false, // プレビュー版では常にfalse

    // フォーム状態
    topicForm,
    setTopicForm,
    editingTopic,

    // 操作関数
    setSelectedTopicId,
    openEditTopic,
    resetTopicForm,
    handleCreateTopic,
    handleUpdateTopic,
    handleDeleteTopic,
    mutateTopics,
  };
};
