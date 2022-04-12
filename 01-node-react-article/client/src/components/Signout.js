const { useEffect } = require("react");
const { authSignoutAction } = require("../actions/auth.actions");

const Signout = (props) => {
    const { setUser } = props;

    useEffect(() => {
        authSignoutAction(setUser, () => { });
        return () => { };
    }, [setUser]);

    return <></>;
};

export default Signout;