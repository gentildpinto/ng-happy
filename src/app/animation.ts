import {
	trigger,
	style,
	animate,
	transition,
	query,
	group,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
	transition('HomePage => OrphanagesPage', [
		query(
			':enter, :leave',
			style({ position: 'fixed', width: '100%' }),
			{ optional: true }
		),
		group([
			query(
				':enter',
				[
					style({ transform: 'translateX(100%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(0%)' })
					),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' })
					),
				],
				{ optional: true }
			),
		]),
	]),
	transition('OrphanagesPage => HomePage', [
		query(
			':enter, :leave',
			style({ position: 'fixed', width: '100%' }),
			{ optional: true }
		),
		group([
			query(
				':enter',
				[
					style({ transform: 'translateX(-100%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(0%)' })
					),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(100%)' })),
				],
				{ optional: true }
			),
		]),
	]),
	transition('OrphanagesPage => CreateOrphanagePage', [
		query(
			':enter, :leave',
			style({ position: 'fixed', width: '100%' }),
			{ optional: true }
		),
		group([
			query(
				':enter',
				[
					style({ transform: 'translateX(100%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(0%)' })
					),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(-100%)' })
					),
				],
				{ optional: true }
			),
		]),
	]),
	transition('CreateOrphanagePage => OrphanagesPage', [
		query(
			':enter, :leave',
			style({ position: 'fixed', width: '100%' }),
			{ optional: true }
		),
		group([
			query(
				':enter',
				[
					style({ transform: 'translateX(-100%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(0%)' })
					),
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ transform: 'translateX(0%)' }),
					animate(
						'0.5s ease-in-out',
						style({ transform: 'translateX(100%)' })),
				],
				{ optional: true }
			),
		]),
	]),
]);
