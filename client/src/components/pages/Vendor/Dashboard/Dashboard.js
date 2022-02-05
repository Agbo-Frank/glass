import './dashboard.css'

function Dashboard(){
    return(
        <>
            {/* <h5>Dashboard</h5> */}
            <div className='dashboard'>
                <div>
                    <div className='grid'>
                        <div>
                            <i className="fa fa-bars"></i>
                            <div>
                                <p>1,995</p>
                                <small>Total Sales</small>
                            </div>
                        </div>
                        <div>
                            <i className="fa fa-bars"></i>
                            <div>
                                <p>1,995</p>
                                <small>Total Sales</small>
                            </div>
                        </div>
                        <div>
                            <i className="fa fa-bars"></i>
                            <div>
                                <p>1,995</p>
                                <small>Total Sales</small>
                            </div>
                        </div>
                        <div>
                            <i className="fa fa-bars"></i>  
                            <div>
                                <p>1,995</p>
                                <small>Total Sales</small>
                            </div>
                        </div>
                    </div>
                    <div className="chart"></div>
                </div>
                <div>
                    <div>
                        <strong>Top Customers</strong>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Total Orders</th>
                                    <th>Total Spending</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>john doe</td>
                                    <td>490</td>
                                    <td>$15,800</td>
                                </tr>
                                <tr>
                                    <td>john doe</td>
                                    <td>490</td>
                                    <td>$15,800</td>
                                </tr>
                                <tr>
                                    <td>john doe</td>
                                    <td>490</td>
                                    <td>$15,800</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <strong>Latest Orders</strong>
                        <table>
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>User</th>
                                    <th>Total Price</th>
                                    <th>Total date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#OD1711</td>
                                    <td>john doe</td>
                                    <td>$15,800</td>
                                    <td>490</td>
                                    <td className='app'>Approved</td>
                                </tr>
                                <tr>
                                    <td>#OD1711</td>
                                    <td>john doe</td>
                                    <td>$15,800</td>
                                    <td>490</td>
                                    <td className='dec'>Declined</td>
                                </tr>
                                <tr>
                                    <td>#OD1711</td>
                                    <td>john doe</td>
                                    <td>$15,800</td>
                                    <td>490</td>
                                    <td className='pen'>Pending</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard