import { StatsCard } from "./StatsCard";
import { LatestTasks } from "./LatestTasks";
import { IncomingMessages } from "./IncomingMessages";
import { UpcomingEvents } from "./UpcomingEvents";
import { LeadsPerformanceChart } from "./LeadsPerformanceChart";
import { Col, Row } from "antd";



export const DashboardGrid = () => {
    return (
       
        <Row gutter={[24, 24]}>
        
            <Col xs={24} lg={12}>
                <div
                    style={{
                        height: "340px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "stretch",
                    }}
                >
                    <LatestTasks />
                    
                </div>
            </Col>   
            <Col xs={24} lg={12}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} sm={12} md={8}>
                        <StatsCard title="Total Contacts" value={0} />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StatsCard title="Won Leads" value={0} />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StatsCard title="Lost Leads" value={0} />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StatsCard title="Total Compañías" value={0} /> 
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StatsCard title="Active Leads" value={0} />
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <StatsCard title="Leads With Tasks" value={0} />
                    </Col>
                </Row>
            </Col>

                                
                    <Col style={{ height: "340px"}} xs={24} lg={8}>
                        <UpcomingEvents />
                    </Col>
                    <Col style={{ height: "340px"}} xs={24} lg={8}>
                        <IncomingMessages />
                    </Col>
                    <Col style={{ height: "340px"}} xs={24} lg={8}>
                        <LeadsPerformanceChart />
                    </Col>


            </Row>          

    );
};