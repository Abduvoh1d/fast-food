import {Riple} from "react-loading-indicators";

function Loading() {
    return (
        <div className={'w-[100%] h-[100vh] flex justify-center items-center'}>
            <Riple color="#FFAB08" size="medium" text="" textColor="#1c84dd"/>
        </div>
    );
}

export default Loading;
