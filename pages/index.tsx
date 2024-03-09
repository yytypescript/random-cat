import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
    initialImageUrl: string
}

// ページコンポーネント関数にpropsを受けとる引数を追加する
const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
    // useStateを使って状態を定義する
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);
    // //マウント時に画像を読み込む宣言
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);
    // ボタンをクリックしたときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    }
    // ローディング中でなければ、画像を表示する
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>
                他のにゃんこも見る
            </button>
            <div className={styles.img}>{loading || <img src={imageUrl} />}</div>
        </div>
    )
}
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url
        }
    };
};

type Image = {
    url: string
}
const fetchImage: () => Promise<Image> = async () => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const images: unknown = await res.json();
    // 配列として表現されているか？
    if (!Array.isArray(images)) {
        throw new Error('APIのレスポンスがおかしい');
    }
    const image: unknown = images[0];
    // Imageの構造をなしているか？
    if(!isImage(image)) {
        throw new Error('APIのレスポンスがおかしい');
    }
    return image;
}

// 型ガード関数
const isImage = (value: unknown): value is Image => {
    // 値がオブジェクトなのか？
    if (!value || typeof value !== 'object' || value === null) {
        return false;
    }
    // urlプロパティが存在し、かつ、文字列なのか？
    return "url" in value && typeof value.url == "string";
}

// fetchImage().then((image: Image) => {
//     console.log(image.alt);
// });
