type Props = {
	disabled?: boolean;
};

export default function ProductCTA({ disabled = true }: Props) {
	return <button disabled={disabled}>Add to bag</button>;
}
