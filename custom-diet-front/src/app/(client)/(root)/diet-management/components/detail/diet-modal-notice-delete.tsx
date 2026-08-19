import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

interface DietModalNoticeDeleteProps {
    open: boolean;
    handleClose: () => void;
}

const DietModalNoticeDelete = ({ open = false, handleClose }: DietModalNoticeDeleteProps) => {
    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-80 max-w-md transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
                    <div className="flex justify-between items-center">
                        <div />
                        <Dialog.Close asChild onClick={handleClose}>
                            <button className="text-gray-500 hover:text-gray-700">
                                <Cross2Icon className="h-5 w-5" />
                            </button>
                        </Dialog.Close>
                    </div>
                    <div className="mt-4">
                        <div className="mb-4 font-medium">이 트레이는 이 다이어트의 데이터로 저장되므로 이 트레이를 삭제하려는 경우 이 트레이를 삭제할 수 없으며 삭제해서는 안 됩니다.</div>
                    </div>
                    <div className='mt-5 w-80 flex items-center justify-center'>
                        <Button className="w-28 mr-10" onClick={handleClose}>계속하다</Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default DietModalNoticeDelete;
