import { NextPage } from "next";

const IndexPage: NextPage = () => {
  return <div>猫画像予定地</div>;
};
export default IndexPage;

const fetchImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
