import { useRouter } from "next/router";
import { VFC } from "react";
import { useUser } from "src/swr/hooks/useUser";

import { Button } from "../@atoms/Button";
import { LargeButton } from "../@atoms/LargeButton";
import { ToolTip } from "../@atoms/ToolTip";

type TopPageProps = {};

export const TopPage: VFC<TopPageProps> = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center gap-6">
        <LargeButton label="教材一覧" className="bg-primary2" />
        <LargeButton label="目標設定" className="bg-secondary2" />
        <LargeButton label="学習記録" onClick={() => router.push("/commit")} />
        <LargeButton label="質問する" className="bg-secondary1" disabled />
      </div>
      <div>メニューボタンを配置</div>
      <div>教材を見る</div>
      <div>勉強を始める</div>
      <div>目標を決める（ロードマップ）</div>
      <div>前回の続きから</div>
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
