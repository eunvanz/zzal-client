import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { DEFAULT_TITLE } from "~/constants/text";
import { Content } from "~/types";
import ContentDetail from "./ContentDetail.view";

export interface ContentDetailPageProps {
  content: Content;
}

const CommonContentDetail: React.FC<ContentDetailPageProps> = ({ content }) => {
  const image = content.images[0];

  const router = useRouter();
  const { t, d } = router.query as { t: string; d: string };

  return (
    <>
      <Head>
        <title>{t || content.title || DEFAULT_TITLE}</title>
        {(d || content.description) && (
          <meta
            property="og:description"
            content={d || content.description || undefined}
          />
        )}
        {image && (
          <>
            <meta property="og:image" content={image.url} />
            <meta property="og:image:url" content={image.url} />
            <meta property="og:image:secure_url" content={image.url} />
            <meta property="og:image:type" content={image.type} />
            <meta property="og:image:width" content={image.width.toString()} />
            <meta property="og:image:height" content={image.height.toString()} />
          </>
        )}
      </Head>
      <ContentDetail
        content={{
          ...content,
          title: t || content.title,
          description: d || content.description,
        }}
      />
    </>
  );
};

export default CommonContentDetail;
