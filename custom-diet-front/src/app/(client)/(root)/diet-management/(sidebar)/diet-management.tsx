'use client'

import { useDiets } from "@/hooks/diet.hook";
import CardLargeDashboard from "../components/dashboard/CardLargeDashboard";
import { Spinner } from "@/components/spinner";
import { useEffect, useMemo } from "react";
import { FavouriteFlag } from "@/types";
import DietReportsMonthlyPriceChart from "../components/dashboard/DietReportsMonthlyPriceChart";
import NutritionStandardCategoryReport from "../components/dashboard/NutritionStandardCategoryReport";
import ClientHeaderPage from "@/components/layout/client/client-header-page";
import ClientFooter from "@/components/layout/client/client-footer";
import { useRouter } from "next/navigation";
import { checkTokenExisted } from "@/utils";
import { BASE_PATH } from "@/constants";

const DietManagement = () => {
    const { data: diets, isPending: isPendingDiets } = useDiets();
    const router = useRouter();

    useEffect(() => {
        checkTokenExisted(router)
    }, [router])

    const favoriteCount = useMemo(() => {
        return diets?.filter(diet => diet.favouriteFlag === FavouriteFlag.Yes).length || 0;
    }, [diets]);

    if (isPendingDiets) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spinner size="large" />
            </div>
        );
    }

    return (
        <>
            <ClientHeaderPage
                image={`${BASE_PATH}/img/bg-knowledge.jpg`}
                title='식단 관리'
                breadcrumbs={[
                    { label: '식단 관리' }
                ]}
            />
            <div className="rounded-2xl bg-gray-100 p-10">
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    <CardLargeDashboard title="총 식단" count={diets?.length} subCount="가지 식단" img={`${BASE_PATH}/img/tray.png`} />
                    <CardLargeDashboard title="총 좋아하는 다이어트" count={favoriteCount} subCount="가지 식단" img={`${BASE_PATH}/img/favorite-diet.png`} />
                </div>
                <div className="mt-4 grid-cols-1">
                    <NutritionStandardCategoryReport />
                </div>
                <div className="mt-4 grid-cols-1">
                    <DietReportsMonthlyPriceChart />
                </div>
            </div>
            <ClientFooter />
        </>
    );
};

export default DietManagement;