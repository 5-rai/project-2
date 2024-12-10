export default function LikeIcon({ className, color = "#FF2929" }: IconProps) {
  return (
    <svg
      width="11"
      height="10"
      viewBox="0 0 11 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.872897 0.920786C1.43106 0.331207 2.18799 0 2.97723 0C3.76647 0 4.5234 0.331207 5.08156 0.920786C5.19069 1.03568 5.33118 1.17867 5.50302 1.34975C5.67446 1.17867 5.81475 1.03568 5.92389 0.920786C6.47971 0.336256 7.2314 0.00711777 8.01561 0.00489862C8.79981 0.00267948 9.55316 0.327559 10.1119 0.908935C10.6707 1.49031 10.9898 2.2812 10.9998 3.10974C11.0097 3.93827 10.7099 4.73749 10.1653 5.33372L5.92329 9.81584C5.81166 9.93376 5.66027 10 5.50242 10C5.34458 10 5.19319 9.93376 5.08156 9.81584L0.839561 5.33435C0.295495 4.74147 -0.00603433 3.94627 9.15456e-05 3.12048C0.00621742 2.29469 0.320102 1.50458 0.872897 0.920786Z"
        fill={color}
      />
    </svg>
  );
}
