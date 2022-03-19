type User = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  plan: "lite" | "closer";
  lastLogin: Date; // 最終ログイン日時
  startedAt: Date; // 利用開始日
  learningPoints: number; // 学習ポイント
};

type UserAchievements = {};
