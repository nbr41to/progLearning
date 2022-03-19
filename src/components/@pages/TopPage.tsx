import { VFC } from "react";
import { Button } from "../@commons/Button";
import { LargeButton } from "../@commons/LargeButton";
import { ToolTip } from "../@commons/ToolTip";

type TopPageProps = {};

export const TopPage: VFC<TopPageProps> = () => {
  return (
    <div>
      <div className="flex justify-center gap-6">
        <LargeButton label="教材一覧" className="bg-primary2" />
        <LargeButton label="目標設定" className="bg-secondary2" />
        <LargeButton label="学習記録" />
        <LargeButton label="質問する" className="bg-secondary1" disabled />
      </div>
      <div>メニューボタンを配置</div>
      <div>教材を見る</div>
      <div>勉強を始める</div>
      <div>目標を決める（ロードマップ）</div>
      <div>設定</div>
      <ToolTip tipContent="説明文だよ">
        <Button label="Button" />
      </ToolTip>
      <Button label="Button" />
      <Button label="Button2" outline />
      <Button label="Button2" outline rounded />
    </div>
  );
};
