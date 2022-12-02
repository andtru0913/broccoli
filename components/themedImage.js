import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useState } from "react";

function ThemedImage({ img_path_light, img_path_dark }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  let src;
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
