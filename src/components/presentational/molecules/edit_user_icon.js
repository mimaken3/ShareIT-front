import React, { Component } from "react";
import UserIcon from "Atoms/user_icon";
import getCroppedImgData from "Modules/getCroppedImgData";
import convertFileToDataURL from "Modules/convertFileToDataURL";
import dataURLtoFile from "Modules/dataURLtoFile";
import styles from "./edit_user_icon.css";
import { Button } from "@material-ui/core";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";

// ユーザ一のアイコン画像を設定
class EditUserIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIconImage: null,
      displayIconImage: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 1 / 1,
      croppedAreaPixels: null,
      croppedImage: null,
      isCropping: false,
      croppedFile: null,
    };
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({
      croppedAreaPixels,
    });
  };

  onZoomChange = (zoom) => {
    this.setState({ zoom });
  };

  // アイコン画像を親コンポーネントに渡す
  getUserIcon() {
    return this.state.croppedFile;
  }

  // 画像をアップロード
  onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await convertFileToDataURL(file);

      this.setState({
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      });
    }
  };

  showResult = async () => {
    try {
      this.setState({
        isCropping: true,
      });

      const resultArr = await getCroppedImgData(
        this.state.imageSrc,
        this.state.croppedAreaPixels
      );
      const croppedImageURL = resultArr[0];
      const croppedImageDataURL = resultArr[1];

      const croppedFile = dataURLtoFile(croppedImageDataURL);

      this.setState({
        croppedImage: croppedImageURL,
        croppedFile: croppedFile,
        isCropping: false,
      });

      // リサイズで表示する画像を消す
      this.setState({ imageSrc: null });
    } catch (e) {
      this.setState({
        isCropping: false,
      });
    }
  };

  render() {
    var Icon;
    if (this.state.croppedImage) {
      Icon = (
        <div>
          <UserIcon iconData={this.state.croppedImage} />
        </div>
      );
    } else {
      Icon = (
        <div>
          <UserIcon iconData={this.props.icon} />
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>ユーザアイコン</div>
        <div>{Icon}</div>
        <div className={styles.App}>
          <input type="file" accept="image/*" onChange={this.onFileChange} />
          {this.state.imageSrc && (
            <div>
              <div className={styles.cropContainer}>
                <Cropper
                  image={this.state.imageSrc}
                  crop={this.state.crop}
                  zoom={this.state.zoom}
                  aspect={this.state.aspect}
                  onCropChange={this.onCropChange}
                  onCropComplete={this.onCropComplete}
                  onZoomChange={this.onZoomChange}
                  cropShape="round"
                />
              </div>
              <div className={styles.controls}>
                <Slider
                  value={this.state.zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => this.onZoomChange(zoom)}
                  // classes={{ container: "slider" }}
                />
              </div>
              <div className={styles.button}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.showResult}
                  disabled={this.state.isCropping}
                >
                  決定
                </Button>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default EditUserIcon;
