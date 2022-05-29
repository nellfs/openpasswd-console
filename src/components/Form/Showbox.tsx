import { useState } from "react";
import { Button } from "../Button";

export interface Showbox {
    value: boolean;
    onChange: (v: boolean) => void;
}

export default function Showbox(props: { type: boolean }) {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    return (
        <div>
            <input type={passwordShown ? "text" : "password"} />
            <button onClick={togglePassword}>Show Password</button>
        </div>

    )

}

// export default function Showbox(props: { type: string }) {

//     return (
//         <div className="">
//             <button>{props.type}</button>
//         </div>
//     )
// }