import React, { forwardRef, useImperativeHandle } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

// プライバシー設定
const Privacy = forwardRef((props, ref) => {
  const classes = useStyles();

  const [privacy, setPrivacy] = React.useState(props.initPrivacy);

  // 親がprivacyの値を参照するための関数
  useImperativeHandle(ref, () => {
    return {
      privacy: privacy,
    };
  });

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="privacy-select-label">プライバシー</InputLabel>
        <Select
          labelId="privacy-select-label"
          id="privacy-select"
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
        >
          <MenuItem value={0}>公開</MenuItem>
          <MenuItem value={1}>非公開</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});

export default Privacy;
