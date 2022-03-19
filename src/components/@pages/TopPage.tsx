import { VFC } from "react";
import { Button } from "../@commons/Button";
import { ToolTip } from "../@commons/ToolTip";

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
      <ToolTip tipContent="説明文だよ">
        <Button label="Button" />
      </ToolTip>
      <Button label="Button" />
      <Button label="Button2" outline />
      <Button label="Button2" outline rounded />
    </div>
  );
};
