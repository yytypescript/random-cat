import { connection } from "next/server";
import { CatImage } from "./cat-image";
import { fetchImage } from "./fetch-image";

export default async function Home() {
  // ビルド時にfetchImageの結果が固定されないようにする
  await connection();
  // APIから画像を取得
  const image = await fetchImage();
  // 画像のURLを渡す
  return <CatImage url={image.url} />;
}
