import { VFC } from "react";

type TopPageProps = {};

export const TopPage: VFC<TopPageProps> = () => {
  return (
    <div>
      <h1>HOME</h1>
      <div>メニューボタンを配置</div>
      <div>教材を見る</div>
      <div>勉強を始める</div>
      <div>目標を決める（ロードマップ）</div>
      <div>設定</div>
    </div>
  );
};
