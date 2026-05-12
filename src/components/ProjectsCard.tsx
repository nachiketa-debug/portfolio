    import { GlassCard } from './GlassCard';

export const ProjectsCard = () => {
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const projectStats = [
        { label: 'Government Projects', value: '3' },
        { label: 'React Applications', value: '5' },
        { label: 'Happy Clients', value: '2+' }
    ];

    return (
        <GlassCard position={[-6.5, 2.2, 0]} width="w-[30rem]">
            <div onClick={scrollToProjects} className="cursor-pointer">
                <div className="text-xl opacity-50 mb-4">Total Projects</div>
                <div className="text-8xl font-bold mb-12">10+</div>
                <div className="space-y-6">
                    {projectStats.map((item) => (
                        <div key={item.label} className="flex justify-between items-center text-lg">
                            <span className="opacity-60">{item.label}</span>
                            <span className="font-semibold text-3xl">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </GlassCard>
    );
};
