import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {NativeSelect, FormControl} from "@material-ui/core";

import {useDispatch} from "react-redux"; 
import {fetchAsyncGetCountry} from "../covidSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}));

const SwitchCountry:React.FC = () => {
    const classes = useStyles();
    //これをfunctionの中で定義すると使えるようになる
    const dispatch = useDispatch();

    const countries = [
        "japan",
        "china",
        "us",
        "frances",
        "italy",
        "spain",
        "united kingdom",
        "germany",
        "russia",
        "brazil",
        "taiwan",
        "thailand",
        "new zealand",
        "sweden",
        "india",
    ];
    return (
       <FormControl className={classes.formControl}>
           <NativeSelect
            onChange={(e:React.ChangeEvent<HTMLSelectElement>) => {
                dispatch(fetchAsyncGetCountry(e.target.value))
            }}
            >
                <option value="">WorldWide</option>
                {countries.map((country, i) => (
                    <option key={i} value={country}>
                        {country}
                    </option>
                ))}
            </NativeSelect>
       </FormControl>
    )
    //fetchAsyncメソッドを使うことによりCovidtsに表示されたものを呼び出すことができる
    //イベントお定義するときはtypescriptの場合型を定義する必要性がある
}

export default SwitchCountry
