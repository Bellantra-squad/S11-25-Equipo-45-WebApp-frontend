import { Row, Col, Segmented, DatePicker, Select, Button, Space } from "antd";
import { FilterOutlined, CalendarOutlined } from "@ant-design/icons";
import { useState } from "react";

const { RangePicker } = DatePicker;

export const DashboardFilters = () => {
    const [dateMode, setDateMode] = useState<string>("hoy");

    return (
        <Row
            gutter={[16, 16]}
            justify="space-between"
            align="middle"
            style={{ marginBottom: 32 }}
        >
            {/* Filtros de tiempo */}
            <Col  lg="auto">
                <Space size="middle" wrap>
                    <Segmented
                        size="large"
                        value={dateMode}
                        onChange={(v) => setDateMode(v as string)}
                        options={[
                            { label: "Hoy", value: "hoy" },
                            { label: "Ayer", value: "ayer" },
                            { label: "Semana", value: "semana" },
                            { label: "Mes", value: "mes" },
                        ]}
                    />

                    {/* Selector de rango */}
                    <RangePicker
                        size="large"
                        allowClear
                        suffixIcon={<CalendarOutlined />}
                    />
                </Space>
            </Col>

            {/* Filtros de Usuario */}
            <Col lg="auto" >
                <Space size="middle" wrap>
                    <Segmented
                        size="large"
                        options={[
                            { label: "Todo", value: "all" },
                            { label: "Propios", value: "mine" },
                        ]}
                    />

                    <Select
                        placeholder="Elija un usuario"
                        size="large"
                        style={{ width: 180 }}
                        options={[
                            { label: "Usuario 1", value: "u1" },
                            { label: "Usuario 2", value: "u2" },
                        ]}
                    />

                    <Button size="large" icon={<FilterOutlined />}>
                        Más filtros
                    </Button>
                </Space>
            </Col>
        </Row>
    );
};