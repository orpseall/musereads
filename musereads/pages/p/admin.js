import SideBar from "@/components/admin/SideBar";
import { GeneralLayout } from "@/components/layout";
import { getserver } from "@/db/config";
import React from "react";

export default function Admin({ admin_data }) {
  return (
    <GeneralLayout>
      <div className="flex flex-1 h-[100%]">
        <SideBar data={admin_data} />
      </div>
    </GeneralLayout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${getserver}/api/admin/getAllData`);
  const admin_data = await res.json();

  return { props: { admin_data } };
}
