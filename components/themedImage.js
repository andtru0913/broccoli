import Image from "next/image";
import { useTheme } from "next-themes";

function ThemedImage({ img_path_light, img_path_dark }) {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = img_path_light;
      break;
    case "dark":
      src = img_path_dark;
      break;
    default:
      src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return <Image src={src} layout="fill" objectFit="contain" />;
}

export default ThemedImage;
