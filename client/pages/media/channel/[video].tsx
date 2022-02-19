import React, { FC, useEffect } from "react";
// import { useRouter } from "next/router";
// import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/users/footer";
import AccountHeaderC from "../../../components/users/navMenus/searchNav";
import MenuHeaderC from "../../../components/users/navMenus/pagesNav";
import { Grid } from '@mui/material';

const VideoC: FC = () => {
//   const { product, id } = useRouter();

    // const [, setImageBuffer] = useState("");

  useEffect((): void => {
    const fetchData = async () => {
      try {
        // const channelResponse = await IndexAPI.get(
        //   `/products/${product}/${id}`
        // );

        // if (channelResponse.data.data.item.imagekey !== null) {
        //   let imagesResponse = await IndexAPI.get(
        //     `/images/${channelResponse.data.data.item.imagekey}`,
        //     {
        //       responseType: "arraybuffer",
        //     }
        //   ).then((response) =>
        //     Buffer.from(response.data, "binary").toString("base64")
        //   );

        //   setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        // }

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // const imageURL = async (imagekey: string) =>{

  //     const imagesResponse = await IndexAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     // setImages(imagesResponse);
  // }

  return (
    <Grid>
      <AccountHeaderC />
      <MenuHeaderC/>
      <FooterC />
    </Grid>
  );
};

export default VideoC;
