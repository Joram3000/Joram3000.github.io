import {
  Title,
  Text,
  Container,
  SimpleGrid,
  Image,
  AspectRatio,
} from "@mantine/core";
import joramStudio from "../../assets/images/joram/joramstudio.webp";
import codaisseur from "../../assets/images/joram/codaisseur.jpg";
import fototje from "../../assets/images/joram/IMG-20211028-WA0010.jpg";
import snowboardensquare from "../../assets/video/snowboardensquare.mp4";
import piraat from "../../assets/images/joram/piraat.jpg";
import pressprace from "../../assets/images/joram/prace1bewerkt.webp";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";

export default function Aboutpage() {
  const { t } = useTranslation();
  return (
    <Container>
      <Title pt="md">{t("about.title")}</Title>
      <Text py="md">{t("about.intro")}</Text>
      <Title pt="md">{t("about.besidesCoding")}</Title>
      <Text py="md">{t("about.besidesCodingText")}</Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <AspectRatio ratio={1 / 1}>
          <Image src={joramStudio} />
        </AspectRatio>
        <AspectRatio ratio={1 / 1}>
          <Image src={piraat} />
        </AspectRatio>
        <AspectRatio ratio={1 / 1}>
          <ReactPlayer
            loop
            playing
            muted
            url={snowboardensquare}
            width="100%"
            height="100%"
          />
        </AspectRatio>
        <AspectRatio ratio={1 / 1}>
          <Image src={pressprace} />
        </AspectRatio>
        <AspectRatio ratio={1 / 1}>
          <Image src={fototje} />
        </AspectRatio>
        <AspectRatio ratio={1 / 1}>
          <Image src={codaisseur} />
        </AspectRatio>
      </SimpleGrid>
    </Container>
  );
}
