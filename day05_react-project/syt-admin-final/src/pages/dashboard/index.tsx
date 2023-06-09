import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "antd";

import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/pages/login/slice";

function Dashboard() {
  const { t } = useTranslation(["app"]);

  const { name } = useAppSelector(selectUser);

  return (
    <Card style={{ minHeight: "calc(100vh - 64px)" }}>
      <h2>{t("dashboard")}</h2>
      <h2>用户名: {name}</h2>
    </Card>
  );
}

export default Dashboard;
