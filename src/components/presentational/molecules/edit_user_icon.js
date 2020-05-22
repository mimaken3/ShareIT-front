import React, { Component } from "react";
import UserIcon from "Atoms/user_icon";
import getCroppedImgData from "Modules/getCroppedImgData";
import convertFileToDataURL from "Modules/convertFileToDataURL";
import dataURLtoFile from "Modules/dataURLtoFile";
import { Button } from "@material-ui/core";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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

  setResult = async () => {
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

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#00CCFF", // 水色
        },
        secondary: {
          main: "#888888", // グレー
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <div className={this.props.classes.userIcon}>{Icon}</div>
        <div className={this.props.classes.App}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={this.onFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="outlined" component="span">
              画像をアップロード
            </Button>
          </label>
          {this.state.imageSrc && (
            <div>
              <div className={this.props.classes.cropContainer}>
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
              <div className={this.props.classes.controls}>
                <Slider
                  value={this.state.zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e, zoom) => this.onZoomChange(zoom)}
                  className={this.props.classes.slider}
                />
              </div>
              <div className={this.props.classes.button}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.setResult}
                  disabled={this.state.isCropping}
                  style={{ color: "white", marginRight: "10px" }}
                >
                  決定
                </Button>
                <Button
                  color="default"
                  variant="outlined"
                  onClick={() => {
                    this.setState({
                      imageSrc: null,
                    });
                  }}
                  style={{ color: "white", backgroundColor: "#888888" }}
                  disabled={this.state.isCropping}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.primary.light,
    backgroundColor: "#888888",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
  // 画像をアップロードするinputを非表示
  inputFileBtnHide: {
    opacity: 0,
    appearance: "none",
    position: "absolute",
  },
  cropContainer: {
    width: "100%",
    height: "400px",
    position: "relative",
  },
  controls: {
    margin: "auto",
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
  slider: {
    padding: "30px 0px",
    color: "#AAAAAA",
  },
  userIcon: {
    width: "80px",
    height: "80px",
    margin: "0 auto",
    marginBottom: "10px",
  },
  button: {
    textAlign: "center",
  },
  // crop画像全体
  // App: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
});

export default withStyles(styles)(EditUserIcon);
