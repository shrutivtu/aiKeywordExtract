import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';


export const KeywordsModal = ({ keywords, loading, isOpen, closeModal }) => {
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Keywords</ModalHeader>
          <ModalCloseButton />
          <ModalBody 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
          >
            {loading ? (
              <CircularProgress 
                isIndeterminate 
                color="blue.300" 
              />
            ) : (
              <Text>{keywords}</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={closeModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

KeywordsModal.propTypes = {
  keywords: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};