"use server"; // 追加

// 画像情報の型定義
type Image = {
  url: string;
};

// APIから画像を取得する関数
export async function fetchImage(): Promise<Image> {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log("fetchImage: 画像情報を取得しました", images);
  return images[0];
}
