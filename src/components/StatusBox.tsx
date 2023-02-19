import classes from "./StatusBox.module.scss";

const StatusBox: React.FC<CompWithPropsOnly<StatusBoxProps>> = (props) => {
    let {image, title, text} = props.propsObj

    return (
        <div className={classes.status_box}>
            <img src={image} alt="a" />
            <h6>{ title }</h6>
            <p>{ text }</p>
        </div>
    )
}

export default StatusBox