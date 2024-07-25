import { Modal, Stack } from "@mantine/core";
import ProfilePictureForm from "./ProfilePictureForm";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

interface AccountModalProps {
    opened: boolean;
    onClose: () => void;
}

function AccountModal({ opened, onClose }: AccountModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Account Profile"
            zIndex={10002}
        >
            <Stack gap="lg">
                <ProfilePictureForm />

                <ProfileForm />

                <ChangePasswordForm />
            </Stack>
        </Modal>
    );
}

export default AccountModal;
