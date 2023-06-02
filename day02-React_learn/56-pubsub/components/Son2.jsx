import PubSub from "pubsub-js";
export default function Son2(){
    return(
        <div>
            <h3>Son2</h3>
            <p><button onClick={()=>{
                PubSub.publish('fengfeng','下次记得叫个车哦!')
            }}>发布峰峰的消息</button></p>
        </div>
    )
}