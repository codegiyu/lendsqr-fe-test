import classes from "./StatusBox.module.scss";

interface Stats {
    image: string;
    title: string;
    text: string;
}

interface Props {
    stats: Stats
}

const StatusBox: React.FC<Props> = (props) => {
    let {image, title, text} = props.stats

    return (
        <div className={classes.status_box}>
            <img src={image} alt="a" />
            <h6>{ title }</h6>
            <p>{ text }</p>
        </div>
    )
}

export default StatusBox