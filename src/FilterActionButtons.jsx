import { Button, HStack } from '@chakra-ui/react'
import React from 'react'

export const FilterActionButtons = (props) => {
  const { onClickApply, onClickCancel, isCancelDisabled } = props
  return (
    <HStack spacing="2" justify="space-between">
      <Button size="sm" variant="ghost" onClick={onClickCancel} isDisabled={isCancelDisabled}>
        Cancel
      </Button>
      <Button size="sm" colorScheme="blue" onClick={onClickApply}>
        Save
      </Button>
    </HStack>
  )
}
