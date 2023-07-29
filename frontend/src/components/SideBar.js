import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import store from '../stores/store';


const SideBar = () => {

    const Store = store()
    const accNos = Object.keys(Store.data)
    console.log(Object.keys(Store.data))

    return (
        <Sidebar>
            <Menu
                menuItemStyles={{
                    button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
            {accNos.length > 0 ? accNos.map((accNo) => {
                return(
                    <MenuItem component={<Link to={`/dashboard/${accNo}`} />} >Account {accNo}</MenuItem>
                )
            }):<></>}
                <MenuItem component={<Link to="/documentation" />}> Documentation</MenuItem>
                <MenuItem component={<Link to="/calendar" />}> Calendar</MenuItem>
                <MenuItem component={<Link to="/e-commerce" />}> E-commerce</MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideBar