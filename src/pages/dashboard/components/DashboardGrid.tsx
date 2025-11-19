import { StatsCard } from "./StatsCard";
import { LatestTasks } from "./LatestTasks";
import { IncomingMessages } from "./IncomingMessages";
import { CalendarUpcomingEvent } from "../../../components/calendar/upcoming-events/event/index";
import { mockUpcomingEvents } from "../../../mocks/calendarUpcomingEvents.mock";
import { LeadsPerformanceChart } from "./LeadsPerformanceChart";
import { Col, Row } from "antd";

export const DashboardGrid = () => {
  const statsCards = [
    { title: "Total Contacts", value: 0 },
    { title: "Won Leads", value: 0 },
    { title: "Lost Leads", value: 0 },
    { title: "Total Compañías", value: 0 },
    { title: "Active Leads", value: 0 },
    { title: "Leads With Tasks", value: 0 },
  ];

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} lg={12}>
        <div
          style={{
            minHeight: "340px",
            height: "100%",
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
          {statsCards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <StatsCard title={card.title} value={card.value} />
            </Col>
          ))}
        </Row>
      </Col>

      <Col style={{ maxHeight: "340px", msOverflowY: "auto", overflowX: "hidden" }} xs={24} lg={8}>
        {mockUpcomingEvents.map((item) => (
          <CalendarUpcomingEvent key={item.id} item={item} />
        ))}
      </Col>
      <Col style={{ minHeight: "340px" }} xs={24} lg={8}>
        <IncomingMessages />
      </Col>
      <Col style={{ minHeight: "340px" }} xs={24} lg={8}>
        <LeadsPerformanceChart />
      </Col>
    </Row>
  );
};
