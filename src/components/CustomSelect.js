import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import CustomView from './CustomView';

const CustomSelect = ({ control, name, rules, options, defaultValue }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <CustomView
          options={options}
          selectedValue={value}
          onChangeSelect={onChange}
          visible={visible}
          setVisible={setVisible}
        />
      )}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

export default CustomSelect;
