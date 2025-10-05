import {GlowingEffectDemo} from "./components/index.js"

export default function Info() {
    return (
        <div style={{
         position: "relative",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
         width: "100%",
         height: "100%",
         overflow: "hidden",   
        }}>
            <GlowingEffectDemo />
        </div>
    )
}