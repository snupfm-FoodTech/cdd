'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { AlertTriangle, HelpCircle } from 'lucide-react';
import { ReactNode } from 'react';

/** 화면에 있는 버튼·항목 이름은 실제 문구 그대로 쓴다 */
const Ui = ({ children }: { children: ReactNode }) => (
  <span className="whitespace-nowrap rounded border bg-white px-1.5 py-0.5 text-[0.92em] font-medium text-foreground">
    {children}
  </span>
);

const Step = ({
  no,
  title,
  children
}: {
  no: string;
  title: string;
  children: ReactNode;
}) => (
  <section className="grid grid-cols-[2rem_1fr] gap-x-3 gap-y-2">
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
      {no}
    </span>
    <h3 className="self-center text-base font-bold tracking-tight">{title}</h3>
    <div className="col-start-2 flex flex-col gap-2 text-sm text-muted-foreground">
      {children}
    </div>
  </section>
);

/** 고치는 범위(재료 / 음식 / 식단 전체)를 구분해 보여준다 */
const Scope = ({
  label,
  where,
  children
}: {
  label: string;
  where: string;
  children: ReactNode;
}) => (
  <div className="rounded-md border bg-muted/40 p-3">
    <p className="mb-1.5 flex flex-wrap items-baseline gap-x-2">
      <span className="rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
        {label}
      </span>
      <span className="text-xs text-muted-foreground">{where}</span>
    </p>
    {children}
  </div>
);

const Caution = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="flex gap-2 rounded-md border border-[#e0a92a] bg-[#fdf4e3] p-3">
    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#8a6206]" aria-hidden />
    <div className="flex flex-col gap-1">
      <p className="text-sm font-bold text-[#8a6206]">{title}</p>
      <p className="text-sm text-foreground/80">{children}</p>
    </div>
  </div>
);

const DietGuideDialog = ({ className }: { className?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={className}>
          <HelpCircle className="mr-1 h-4 w-4" />
          사용법
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>식단 관리 사용법</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          한 끼 식단을 만들어 영양기준에 맞추고 저장하기까지의 과정입니다.
          순서대로 따라 하시면 됩니다.
        </p>

        <div className="mt-2 flex flex-col gap-6">
          <Step no="1" title="식단 만들기">
            <p>
              목록 위 <Ui>식단 추가</Ui> 를 누르고 네 가지를 정합니다.
            </p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                <b className="text-foreground">식단명</b> — 고른 영양기준에 맞춰
                <b className="text-foreground"> 자동으로 채워집니다.</b> 그대로
                저장해도 되고 고쳐도 됩니다. 같은 이름은 쓸 수 없습니다.
              </li>
              <li>
                <b className="text-foreground">식단 설명</b> — 선택 입력입니다.
                어떤 대상을 위한 식단인지 적어두면 목록에서 구분됩니다.
              </li>
              <li>
                <b className="text-foreground">식단 구성 설정</b> — 식판 형태를
                고릅니다.
              </li>
              <li>
                <b className="text-foreground">영양기준</b> — 이 기준으로 이후
                모든 평가가 이뤄집니다.
              </li>
            </ul>
            <p>
              저장하면 고른{' '}
              <b className="text-foreground">영양기준과 식단 구성(찬 수)에 맞는
              샘플 식단</b>이 식판에 채워진 채로 열립니다. 음식을 하나씩 담을
              필요 없이 바로 시작할 수 있고, 이 구성에서 필요한 칸만 바꾸면
              됩니다. 조건에 맞는 샘플이 없을 때만 빈 식판으로 열립니다.
            </p>
            <p>
              <b className="text-foreground">이미 만든 식단에서 시작하기</b> —
              비슷한 식단을 또 만들 때는 식단 화면의 <Ui>복사</Ui> 또는 목록에서
              식단 오른쪽 ⋯ → <Ui>복사</Ui> 를 누릅니다. 음식·재료·영양기준이
              그대로 담긴 복사본이 생기고, <b className="text-foreground">원본은
              바뀌지 않습니다.</b>
            </p>
          </Step>

          <Step no="2" title="음식 바꾸기">
            <p>
              <b className="text-foreground">바꿀 칸을 클릭</b>하면 아래에 그
              자리에 넣을 음식이 나옵니다. 칸마다 들어갈 음식 종류가 정해져
              있습니다.
            </p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                <b className="text-foreground">「○○」과 비슷한 음식</b> — 지금
                담긴 음식과 같은 종류의 대체 후보가 나옵니다. 마음에 드는 것의{' '}
                <Ui>변경하기</Ui> 를 누르면 바로 바뀝니다. 후보를 눌러보면 재료와
                조리법을 미리 볼 수 있습니다.
              </li>
              <li>후보에 없으면 검색으로 직접 찾습니다.</li>
            </ul>
            <p>직접 만든 레시피는 검색 결과 맨 위에 나옵니다.</p>
          </Step>

          <Step no="3" title="수정하기">
            <p>
              고치는 범위가 세 가지로 나뉩니다. 어디를 고치는지에 따라 손대는
              자리가 다릅니다.
            </p>

            <Scope label="재료 하나" where="음식을 클릭하면 펼쳐지는 재료 표">
              <ul className="ml-4 list-disc space-y-1">
                <li>재료마다 <b className="text-foreground">재료량(g)</b> 을 직접 입력합니다.</li>
                <li>
                  <Ui>식품 추가하기</Ui> 로 재료를 더하고, 오른쪽 버튼으로 뺍니다.
                </li>
                <li>
                  <Ui>내 식품 목록</Ui> 에서 직접 등록한 식재료를 골라 넣을 수
                  있습니다.
                </li>
              </ul>
            </Scope>

            <Scope label="음식 하나" where="재료 표 위쪽">
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <b className="text-foreground">음식명</b> 과{' '}
                  <b className="text-foreground">조리법</b> 을 고칩니다.
                </li>
                <li>
                  <b className="text-foreground">총 제공량</b> 을 입력하면 그
                  음식의 재료가 비율을 유지한 채 전부 맞춰집니다.
                </li>
              </ul>
            </Scope>

            <Scope label="식단 전체" where="오른쪽 「중량 정보」">
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <b className="text-foreground">맞출 중량</b> 을 넣고{' '}
                  <Ui>맞추기</Ui> 를 누르면 <b className="text-foreground">모든
                  음식</b>의 재료가 한 번에 조정됩니다.
                </li>
                <li>잘못 눌렀다면 <Ui>되돌리기</Ui>.</li>
              </ul>
            </Scope>

            <p>
              음식 하나든 식단 전체든, 맞추고 나면 재료가 모두
              <b className="text-foreground"> g 단위로 딱 떨어져</b> 저울로 재기
              좋습니다.
            </p>
          </Step>

          <Step no="4" title="영양기준 확인하고 저장">
            <p>
              식단명 옆 배지가 지금 상태를 알려줍니다. 부적합이면 어떤 영양소가
              걸리는지 배지에 함께 나오고, 영양소정보 표의{' '}
              <b className="text-foreground">영양기준 대비</b> 칸에서 얼마나
              벗어났는지 볼 수 있습니다.
            </p>
            <Caution title="부적합 상태로 저장하면 영양기준이 바뀝니다">
              저장은 됩니다. 다만 그 식단의 영양기준이 <b>일반식으로 변경</b>되어,
              원래 고른 기준으로는 더 이상 관리되지 않습니다.
            </Caution>
          </Step>

          <Step no="＋" title="레시피로 저장해 다시 쓰기">
            <p>레시피를 만드는 길은 두 가지입니다.</p>
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                <b className="text-foreground">식단에서 저장</b> — 음식 편집
                화면 아래 <Ui>내 레시피로 저장</Ui>. 지금 구성한 음식이 그대로
                레시피가 됩니다.
              </li>
              <li>
                <b className="text-foreground">처음부터 만들기</b> — 상단 메뉴{' '}
                <b className="text-foreground">레시피</b> 화면의{' '}
                <Ui>새 레시피 만들기</Ui>. 재료를 검색해 담고 중량을 넣습니다.
              </li>
            </ul>
            <p>
              저장한 레시피는 <b className="text-foreground">레시피 → My Recipe</b>{' '}
              에서 수정·삭제하며, 나에게만 보입니다. 식단에서 음식을 찾을 때
              검색 결과 맨 위에 나옵니다.
            </p>
            <Caution title="레시피를 수정하여도 이미 담긴 식단은 그대로입니다">
              수정한 레시피를 식단에 반영하려면 그 칸을 다시 클릭해 음식을 새로
              담아야 합니다.
            </Caution>
          </Step>

          <Step no="＋" title="식단 목록 정리">
            <ul className="ml-4 list-disc space-y-1.5">
              <li>
                <b className="text-foreground">묶기</b> 로 식단 유형 · 식단 구성 ·
                최근 수정순 중에 골라 봅니다.
              </li>
              <li>
                검색은 식단명뿐 아니라 유형·구성으로도 걸립니다. &quot;당뇨&quot;를
                치면 그 기준 식단이 모두 나옵니다.
              </li>
              <li>
                <Ui>선택</Ui> 을 누르고 여러 식단을 고르면 한 번에 엑셀로
                내려받을 수 있습니다.
              </li>
              <li>
                목록의 각 식단에서 <b className="text-foreground">즐겨찾기</b>{' '}
                별표를 켜면 위쪽에 따로 모이고, 거기서 수정·삭제도 합니다.
              </li>
              <li>
                식단명·설명·영양기준을 바꾸려면 식단 화면의{' '}
                <Ui>식단 정보 수정</Ui> 을 씁니다.
              </li>
            </ul>
          </Step>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DietGuideDialog;
