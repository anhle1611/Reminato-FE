import { register } from '../../services/auth';
import { history } from '../../utils/history';
import { show } from '../../core/slices/messageGlobal';

export const registerUser = (newUserData: any) => async (dispatch: any) => {
    try {
        await register(newUserData);
        dispatch(
            show({
                type: "success",
                title: "Authentication",
                content:  "Đăng kí người dùng thành công !"
            }
        ));
        history.push('/login');
    } catch (err) {
        dispatch(show({
                type: "error",
                title: "Authentication",
                content:  "Đăng kí người dùng không thành công !"
            }));
    }
};
